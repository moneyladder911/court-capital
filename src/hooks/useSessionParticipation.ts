import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Participant {
  id: string;
  userId: string;
  name: string;
  avatarUrl: string | null;
  attended: boolean | null;
  markedAt: string | null;
}

export function useSessionParticipants(sessionId: string) {
  return useQuery({
    queryKey: ["session-participants", sessionId],
    queryFn: async (): Promise<Participant[]> => {
      const { data, error } = await supabase
        .from("session_participants")
        .select(`
          id,
          user_id,
          attended,
          marked_at,
          profiles!session_participants_user_id_fkey (
            name,
            avatar_url
          )
        `)
        .eq("session_id", sessionId);

      if (error) throw error;

      return (data || []).map((p: any) => ({
        id: p.id,
        userId: p.user_id,
        name: p.profiles?.name || "Anonymous",
        avatarUrl: p.profiles?.avatar_url,
        attended: p.attended,
        markedAt: p.marked_at,
      }));
    },
    enabled: !!sessionId,
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      participantId,
      attended,
    }: {
      participantId: string;
      attended: boolean;
    }) => {
      const { error } = await supabase
        .from("session_participants")
        .update({ attended })
        .eq("id", participantId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["session-participants"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUserParticipation(sessionId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["session-participation", sessionId, user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("session_participants")
        .select("*")
        .eq("session_id", sessionId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!sessionId && !!user?.id,
  });
}

export function useIsSessionHost(sessionId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["session-host", sessionId, user?.id],
    queryFn: async () => {
      if (!user?.id) return false;

      const { data, error } = await supabase
        .from("sessions")
        .select("host_id")
        .eq("id", sessionId)
        .single();

      if (error) return false;
      return data?.host_id === user.id;
    },
    enabled: !!sessionId && !!user?.id,
  });
}
