import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

export interface ThreadReply {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile: {
    name: string;
    avatar_url: string | null;
    role: string;
    member_tier: string;
  };
}

interface DbThread {
  id: string;
  parent_post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export const useLoungeThreads = (postId: string, userId?: string) => {
  const [threads, setThreads] = useState<ThreadReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("lounge_threads" as any)
          .select("*")
          .eq("parent_post_id", postId)
          .order("created_at", { ascending: true });

        if (fetchError) throw fetchError;

        // Fetch profile data for each thread
        const threadsWithProfiles = await Promise.all(
          ((data as unknown as DbThread[]) || []).map(async (thread) => {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("name, avatar_url, crypto_role, member_tier")
              .eq("user_id", thread.user_id)
              .maybeSingle();

            return {
              id: thread.id,
              user_id: thread.user_id,
              content: thread.content,
              created_at: thread.created_at,
              profile: {
                name: profileData?.name || "Anonymous",
                avatar_url: profileData?.avatar_url || null,
                role: profileData?.crypto_role || "founder",
                member_tier: profileData?.member_tier || "explorer",
              },
            } as ThreadReply;
          })
        );

        setThreads(threadsWithProfiles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch threads");
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();

    const subscription = supabase
      .channel(`lounge_threads_${postId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lounge_threads", filter: `parent_post_id=eq.${postId}` },
        () => {
          fetchThreads();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [postId]);

  const addThread = useCallback(
    async (content: string) => {
      if (!userId) {
        setError("Must be logged in to reply");
        return null;
      }

      try {
        setLoading(true);
        const { data, error: insertError } = await supabase
          .from("lounge_threads" as any)
          .insert({
            parent_post_id: postId,
            user_id: userId,
            content,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add reply");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [postId, userId]
  );

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: false })
        .replace("about ", "")
        .replace(" minutes", "m")
        .replace(" minute", "m")
        .replace(" hours", "h")
        .replace(" hour", "h")
        .replace(" days", "d")
        .replace(" day", "d")
        .replace("less than a minute", "now");
    } catch {
      return "now";
    }
  };

  return { threads, loading, error, addThread, formatTimestamp };
};
