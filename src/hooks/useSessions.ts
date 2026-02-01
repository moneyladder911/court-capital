import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Database } from "@/integrations/supabase/types";

type Session = Database["public"]["Tables"]["sessions"]["Row"];
type SessionInsert = Database["public"]["Tables"]["sessions"]["Insert"];

export interface SessionFilters {
  sport?: Database["public"]["Enums"]["sport_type"];
  skillLevel?: Database["public"]["Enums"]["skill_level"];
  sessionIntent?: string;
  isLive?: boolean;
  limit?: number;
}

export interface SessionWithHost extends Session {
  host?: {
    name: string;
    crypto_role: string | null;
    avatar_url: string | null;
  };
  participantCount?: number;
}

export function useSessions(filters: SessionFilters = {}) {
  return useQuery({
    queryKey: ["sessions", filters],
    queryFn: async (): Promise<SessionWithHost[]> => {
      let query = supabase
        .from("sessions")
        .select(`
          *,
          profiles!sessions_host_id_fkey (
            name,
            crypto_role,
            avatar_url
          ),
          session_participants (count)
        `)
        .order("scheduled_at", { ascending: true });

      if (filters.sport) {
        query = query.eq("sport", filters.sport);
      }

      if (filters.skillLevel) {
        query = query.eq("skill_level", filters.skillLevel);
      }

      if (filters.isLive !== undefined) {
        query = query.eq("is_live", filters.isLive);
      }

      if (filters.sessionIntent) {
        query = query.contains("session_intent", [filters.sessionIntent]);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((session: any) => ({
        ...session,
        host: session.profiles
          ? {
              name: session.profiles.name,
              crypto_role: session.profiles.crypto_role,
              avatar_url: session.profiles.avatar_url,
            }
          : undefined,
        participantCount: session.session_participants?.[0]?.count || 0,
      }));
    },
  });
}

export function useUpcomingSessions(limit = 5) {
  return useQuery({
    queryKey: ["sessions", "upcoming", limit],
    queryFn: async (): Promise<SessionWithHost[]> => {
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .gte("scheduled_at", new Date().toISOString())
        .order("scheduled_at", { ascending: true })
        .limit(limit);

      if (error) throw error;

      // Fetch host profiles separately
      const hostIds = [...new Set((data || []).map((s) => s.host_id))];
      
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, name, crypto_role, avatar_url")
        .in("user_id", hostIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

      return (data || []).map((session) => {
        const host = profileMap.get(session.host_id);
        return {
          ...session,
          host: host
            ? {
                name: host.name,
                crypto_role: host.crypto_role,
                avatar_url: host.avatar_url,
              }
            : undefined,
        };
      });
    },
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (session: Omit<SessionInsert, "host_id">) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("sessions")
        .insert({
          ...session,
          host_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
}

export function useJoinSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { error } = await supabase.from("session_participants").insert({
        session_id: sessionId,
        user_id: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["session-participation"] });
    },
  });
}

export function useLeaveSession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("session_participants")
        .delete()
        .eq("session_id", sessionId)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["session-participation"] });
    },
  });
}
