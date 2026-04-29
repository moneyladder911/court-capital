import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

function useEventRsvp(eventId: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["event-rsvp", eventId, user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("event_rsvps")
        .select("*")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });
}

function useRsvpEvent() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ eventId, status }: { eventId: string; status: string }) => {
      if (!user?.id) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("event_rsvps")
        .upsert({ event_id: eventId, user_id: user.id, status }, { onConflict: "event_id,user_id" });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["event-rsvp", vars.eventId] });
    },
  });
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  tournament: "Tournament",
  social_mixer: "Social Mixer",
  training_camp: "Training Camp",
  vip_dinner: "VIP Dinner",
  clinic: "Clinic",
  open_play: "Open Play",
};

export function EventCard({ event, featured = false }: EventCardProps) {
  const { data: rsvp } = useEventRsvp(event.id);
  const rsvpEvent = useRsvpEvent();
  const isRsvpd = !!rsvp;

  const scheduledDate = new Date(event.scheduled_at);

  const handleRsvp = () => {
    rsvpEvent.mutate({ eventId: event.id, status: isRsvpd ? "cancelled" : "going" });
  };

  if (featured) {
    return (
      <div
        className="relative rounded-xl overflow-hidden p-8 md:p-10"
        style={{
          background: "linear-gradient(135deg, hsl(39 45% 61% / 0.12) 0%, hsl(0 0% 6%) 60%)",
          border: "1px solid hsl(39 45% 61% / 0.2)",
        }}
      >
        {event.is_vip && (
          <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded border border-primary/30 bg-primary/10">
            <span className="text-primary text-[0.55rem]">★</span>
            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-primary">VIP Event</span>
          </div>
        )}
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">{event.title}</h2>
        {event.description && (
          <p className="font-sans text-sm text-muted-foreground mb-6 max-w-lg leading-relaxed">{event.description}</p>
        )}
        <div className="flex flex-wrap gap-6 mb-8">
          <div>
            <p className="font-sans text-[0.6rem] tracking-widest uppercase text-muted-foreground mb-1">Date</p>
            <p className="font-sans text-sm text-foreground">{format(scheduledDate, "EEEE, d MMMM yyyy")}</p>
          </div>
          <div>
            <p className="font-sans text-[0.6rem] tracking-widest uppercase text-muted-foreground mb-1">Time</p>
            <p className="font-sans text-sm text-foreground">{format(scheduledDate, "HH:mm")}</p>
          </div>
          <div>
            <p className="font-sans text-[0.6rem] tracking-widest uppercase text-muted-foreground mb-1">Location</p>
            <p className="font-sans text-sm text-foreground">{event.location}</p>
          </div>
          {event.price !== null && event.price !== undefined && (
            <div>
              <p className="font-sans text-[0.6rem] tracking-widest uppercase text-muted-foreground mb-1">Entry</p>
              <p className="font-sans text-sm text-foreground">{event.price === 0 ? "Complimentary" : `AED ${event.price}`}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleRsvp}
          disabled={rsvpEvent.isPending}
          className={`px-8 py-3 font-sans text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 rounded ${
            isRsvpd
              ? "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/5"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {rsvpEvent.isPending ? "..." : isRsvpd ? "✓ Attending — Cancel" : "Reserve My Spot"}
        </button>
      </div>
    );
  }

  return (
    <div
      className="group rounded-lg p-5 transition-all duration-300"
      style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(39 45% 61% / 0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 11%)";
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          {event.is_vip && (
            <span className="inline-block font-sans text-[0.55rem] tracking-widest uppercase text-primary mb-1.5">★ VIP</span>
          )}
          <h3 className="font-display text-base text-foreground leading-tight truncate">{event.title}</h3>
          {event.event_type && (
            <p className="font-sans text-[0.7rem] text-muted-foreground mt-0.5">
              {EVENT_TYPE_LABELS[event.event_type] || event.event_type}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
        <span className="font-sans text-xs text-muted-foreground">{format(scheduledDate, "EEE d MMM · HH:mm")}</span>
        <span className="font-sans text-xs text-muted-foreground">{event.location}</span>
        {event.price !== null && event.price !== undefined && (
          <span className="font-sans text-xs text-muted-foreground">
            {event.price === 0 ? "Free" : `AED ${event.price}`}
          </span>
        )}
      </div>

      <button
        onClick={handleRsvp}
        disabled={rsvpEvent.isPending}
        className={`w-full py-2.5 font-sans text-[0.65rem] tracking-[0.15em] uppercase transition-all duration-300 rounded ${
          isRsvpd
            ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/5"
            : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        {rsvpEvent.isPending ? "..." : isRsvpd ? "✓ Going — Cancel" : "RSVP"}
      </button>
    </div>
  );
}
