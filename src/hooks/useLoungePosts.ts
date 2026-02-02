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

interface DbLoungePost {
  id: string;
  user_id: string;
  post_type: string;
  title: string;
  content: string | null;
  link: string | null;
  created_at: string;
  updated_at: string;
}

interface DbReaction {
  reaction_type: string;
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

        // Fetch posts with profile data
        const { data: postsData, error: fetchError } = await supabase
          .from("lounge_posts" as any)
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        // Fetch profile data for each post
        const enrichedPosts = await Promise.all(
          ((postsData as unknown as DbLoungePost[]) || []).map(async (post) => {
            // Get profile
            const { data: profileData } = await supabase
              .from("profiles")
              .select("name, avatar_url, crypto_role, member_tier, is_online")
              .eq("user_id", post.user_id)
              .maybeSingle();

            // Get reactions
            const { data: reactions } = await supabase
              .from("lounge_reactions" as any)
              .select("reaction_type")
              .eq("post_id", post.id);

            // Get threads count
            const { data: threads } = await supabase
              .from("lounge_threads" as any)
              .select("id")
              .eq("parent_post_id", post.id);

            const reactionsList = (reactions as unknown as DbReaction[]) || [];
            const reactionCounts = {
              seen: reactionsList.filter((r) => r.reaction_type === "seen").length,
              interesting: reactionsList.filter((r) => r.reaction_type === "interesting").length,
              vibe: reactionsList.filter((r) => r.reaction_type === "vibe").length,
            };

            const userReactions: ReactionType[] = userId
              ? reactionsList
                  .filter((r) => r.reaction_type)
                  .map((r) => r.reaction_type as ReactionType)
              : [];

            return {
              ...post,
              post_type: post.post_type as PostType,
              profile: {
                name: profileData?.name || "Anonymous",
                avatar_url: profileData?.avatar_url || null,
                role: profileData?.crypto_role || "founder",
                member_tier: profileData?.member_tier || "explorer",
                is_online: profileData?.is_online || false,
              },
              reactions: reactionCounts,
              user_reactions: userReactions,
              thread_count: (threads as any[])?.length || 0,
            } as LoungePost;
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
