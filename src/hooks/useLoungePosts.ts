import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

export type PostType = "reading" | "watching" | "thinking" | "reacting";
export type ReactionType = "seen" | "interesting" | "vibe";

export interface LoungePost {
  id: string;
  user_id: string;
  post_type: PostType;
  title: string;
  content: string | null;
  link: string | null;
  created_at: string;
  updated_at: string;
  profile: {
    name: string;
    avatar_url: string | null;
    role: string;
    member_tier: string;
    is_online: boolean;
  };
  reactions: {
    seen: number;
    interesting: number;
    vibe: number;
  };
  user_reactions: ReactionType[];
  thread_count: number;
}

export const useLoungePosts = (userId?: string) => {
  const [posts, setPosts] = useState<LoungePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("lounge_posts")
          .select(
            `
            *,
            profile:profiles(name, avatar_url, role, member_tier, is_online)
          `
          )
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        const enrichedPosts = await Promise.all(
          (data || []).map(async (post) => {
            const { data: reactions } = await supabase
              .from("lounge_reactions")
              .select("reaction_type")
              .eq("post_id", post.id);

            const { data: threads } = await supabase
              .from("lounge_threads")
              .select("id")
              .eq("parent_post_id", post.id);

            const reactionCounts = {
              seen: reactions?.filter((r) => r.reaction_type === "seen").length || 0,
              interesting: reactions?.filter((r) => r.reaction_type === "interesting").length || 0,
              vibe: reactions?.filter((r) => r.reaction_type === "vibe").length || 0,
            };

            const userReactions = userId
              ? reactions
                  ?.filter((r) => r.reaction_type)
                  .map((r) => r.reaction_type) || []
              : [];

            return {
              ...post,
              reactions: reactionCounts,
              user_reactions: userReactions,
              thread_count: threads?.length || 0,
            };
          })
        );

        setPosts(enrichedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    const subscription = supabase
      .channel("lounge_posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lounge_posts" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

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

  return { posts, loading, error, formatTimestamp };
};
