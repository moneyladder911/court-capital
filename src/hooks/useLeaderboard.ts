import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type UserPoints = Database["public"]["Tables"]["user_points"]["Row"];

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  role: string | null;
  city: string | null;
  points: number;
  streak: number;
  sessionsAttended: number;
  sessionsHosted: number;
  change: number;
}

export type LeaderboardFilter = "global" | "city" | "sport";
export type LeaderboardTimeframe = "week" | "month" | "alltime";

export function useLeaderboard(
  filter: LeaderboardFilter = "global",
  timeframe: LeaderboardTimeframe = "month",
  city?: string
) {
  return useQuery({
    queryKey: ["leaderboard", filter, timeframe, city],
    queryFn: async (): Promise<LeaderboardEntry[]> => {
      // Fetch user_points with profiles
      let query = supabase
        .from("user_points")
        .select(`
          *,
          profiles!user_points_user_id_fkey (
            name,
            avatar_url,
            crypto_role,
            city
          )
        `)
        .order("total_points", { ascending: false })
        .limit(50);

      const { data, error } = await query;

      if (error) throw error;

      let entries: LeaderboardEntry[] = (data || []).map((entry: any, index: number) => ({
        rank: index + 1,
        userId: entry.user_id,
        name: entry.profiles?.name || "Anonymous",
        avatarUrl: entry.profiles?.avatar_url,
        role: entry.profiles?.crypto_role,
        city: entry.profiles?.city,
        points: entry.total_points || 0,
        streak: entry.current_streak || 0,
        sessionsAttended: entry.sessions_attended || 0,
        sessionsHosted: entry.sessions_hosted || 0,
        change: 0, // Would need historical data to calculate
      }));

      // Filter by city if needed
      if (filter === "city" && city) {
        entries = entries.filter((e) => e.city?.toLowerCase() === city.toLowerCase());
        // Recalculate ranks
        entries = entries.map((e, i) => ({ ...e, rank: i + 1 }));
      }

      return entries;
    },
  });
}

export function useCurrentUserRank() {
  return useQuery({
    queryKey: ["user-rank"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: userPoints } = await supabase
        .from("user_points")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!userPoints) return null;

      // Count users with more points
      const { count } = await supabase
        .from("user_points")
        .select("*", { count: "exact", head: true })
        .gt("total_points", userPoints.total_points || 0);

      return {
        rank: (count || 0) + 1,
        points: userPoints.total_points || 0,
        streak: userPoints.current_streak || 0,
        sessionsAttended: userPoints.sessions_attended || 0,
      };
    },
  });
}
