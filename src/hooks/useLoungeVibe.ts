import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface LoungeVibe {
  id: string;
  prompt: string;
  created_at: string;
  scheduled_date: string;
}

interface DbVibe {
  id: string;
  prompt: string;
  created_at: string;
  scheduled_date: string;
}

export const useLoungeVibe = () => {
  const [vibe, setVibe] = useState<LoungeVibe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVibe = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split("T")[0];

        const { data, error: fetchError } = await supabase
          .from("lounge_vibes" as any)
          .select("*")
          .eq("scheduled_date", today)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data) {
          const { data: anyVibe } = await supabase
            .from("lounge_vibes" as any)
            .select("*")
            .order("scheduled_date", { ascending: false })
            .limit(1)
            .maybeSingle();

          if (anyVibe) {
            const vibeData = anyVibe as unknown as DbVibe;
            setVibe({
              id: vibeData.id,
              prompt: vibeData.prompt,
              created_at: vibeData.created_at,
              scheduled_date: vibeData.scheduled_date,
            });
          }
        } else {
          const vibeData = data as unknown as DbVibe;
          setVibe({
            id: vibeData.id,
            prompt: vibeData.prompt,
            created_at: vibeData.created_at,
            scheduled_date: vibeData.scheduled_date,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch vibe");
      } finally {
        setLoading(false);
      }
    };

    fetchVibe();
  }, []);

  return { vibe, loading, error };
};
