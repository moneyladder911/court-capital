import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ReactionType } from "./useLoungePosts";

export const useLoungeReactions = (userId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleReaction = useCallback(
    async (postId: string, reactionType: ReactionType) => {
      if (!userId) {
        setError("Must be logged in to react");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data: existing } = await supabase
          .from("lounge_reactions")
          .select("id")
          .eq("post_id", postId)
          .eq("user_id", userId)
          .eq("reaction_type", reactionType)
          .maybeSingle();

        if (existing) {
          const { error: deleteError } = await supabase
            .from("lounge_reactions")
            .delete()
            .eq("id", existing.id);

          if (deleteError) throw deleteError;
        } else {
          const { error: insertError } = await supabase
            .from("lounge_reactions")
            .insert({
              post_id: postId,
              user_id: userId,
              reaction_type: reactionType,
            });

          if (insertError) throw insertError;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to toggle reaction");
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  const createPost = useCallback(
    async (
      postType: "reading" | "watching" | "thinking" | "reacting",
      title: string,
      content?: string,
      link?: string
    ) => {
      if (!userId) {
        setError("Must be logged in to post");
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: insertError } = await supabase
          .from("lounge_posts")
          .insert({
            user_id: userId,
            post_type: postType,
            title,
            content: content || null,
            link: link || null,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create post");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  const deletePost = useCallback(
    async (postId: string) => {
      try {
        setLoading(true);
        setError(null);

        const { error: deleteError } = await supabase
          .from("lounge_posts")
          .delete()
          .eq("id", postId)
          .eq("user_id", userId);

        if (deleteError) throw deleteError;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete post");
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  return { toggleReaction, createPost, deletePost, loading, error };
};
