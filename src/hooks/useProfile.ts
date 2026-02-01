import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
type UserSport = Database["public"]["Tables"]["user_sports"]["Row"];

export interface ProfileWithSports extends Profile {
  sports: UserSport[];
}

export function useProfile(userId?: string) {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;

  return useQuery({
    queryKey: ["profile", targetUserId],
    queryFn: async (): Promise<ProfileWithSports | null> => {
      if (!targetUserId) return null;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", targetUserId)
        .single();

      if (profileError) {
        if (profileError.code === "PGRST116") return null;
        throw profileError;
      }

      const { data: sports, error: sportsError } = await supabase
        .from("user_sports")
        .select("*")
        .eq("user_id", targetUserId);

      if (sportsError) throw sportsError;

      return {
        ...profile,
        sports: sports || [],
      };
    },
    enabled: !!targetUserId,
  });
}

export function useCurrentProfile() {
  const { user } = useAuth();
  return useProfile(user?.id);
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}

export function useUpdateUserSports() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (
      sports: { sport: Database["public"]["Enums"]["sport_type"]; skill_level: number }[]
    ) => {
      if (!user?.id) throw new Error("Not authenticated");

      // Delete existing sports
      await supabase.from("user_sports").delete().eq("user_id", user.id);

      // Insert new sports
      if (sports.length > 0) {
        const { error } = await supabase.from("user_sports").insert(
          sports.map((s) => ({
            user_id: user.id,
            sport: s.sport,
            skill_level: s.skill_level,
          }))
        );
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}
