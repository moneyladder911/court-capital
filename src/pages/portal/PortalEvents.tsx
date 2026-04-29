import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventCard } from "@/components/portal/EventCard";
import type { Database } from "@/integrations/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"];

function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<Event[]> => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("scheduled_at", new Date().toISOString())
        .order("scheduled_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/4 rounded animate-pulse ${className}`} />;
}

const PortalEvents = () => {
  const { data: events, isLoading } = useEvents();
  const vipEvents = events?.filter((e) => e.is_vip) ?? [];
  const regularEvents = events?.filter((e) => !e.is_vip) ?? [];

  return (
    <div className="space-y-10">
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-2">Padel House</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground">Events</h1>
        <p className="font-sans text-sm text-muted-foreground mt-2">Exclusive gatherings, tournaments, and social nights for members.</p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-40 rounded-lg" />)}
          </div>
        </div>
      ) : events && events.length > 0 ? (
        <>
          {vipEvents.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">Featured</h2>
              {vipEvents.map((event) => <EventCard key={event.id} event={event} featured />)}
            </div>
          )}
          {regularEvents.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">Upcoming</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regularEvents.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl p-16 text-center" style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}>
          <p className="font-display text-xl text-foreground mb-2">No events scheduled</p>
          <p className="font-sans text-sm text-muted-foreground">Events will appear here when scheduled.</p>
        </div>
      )}
    </div>
  );
};

export default PortalEvents;
