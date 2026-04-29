import { useState } from "react";
import { useSessions } from "@/hooks/useSessions";
import { SessionCard } from "@/components/portal/SessionCard";

type Filter = "all" | "competitive" | "social";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/4 rounded animate-pulse ${className}`} />;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All Matches" },
  { value: "competitive", label: "League" },
  { value: "social", label: "Social" },
];

const PortalMatches = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const { data: sessions, isLoading } = useSessions({
    sport: "padel",
    sessionIntent: activeFilter !== "all" ? activeFilter : undefined,
  });

  const filtered = sessions?.filter((s) => {
    if (activeFilter === "all") return true;
    return s.session_intent?.includes(activeFilter);
  }) ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Padel House
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground">Matches</h1>
        <p className="font-sans text-sm text-muted-foreground mt-2">
          League fixtures and social play — join a match or host your own.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 rounded-lg w-fit" style={{ background: "hsl(0 0% 6%)" }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-2 rounded-md font-sans text-[0.7rem] tracking-wide transition-all duration-200 ${
              activeFilter === f.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Sessions grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-48 rounded-lg" />)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-xl p-16 text-center"
          style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}
        >
          <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M4.93 4.93c4.1 4.1 10.14 4.1 14.14 0M4.93 19.07c4.1-4.1 10.14-4.1 14.14 0"/>
              <path d="M12 2v20M2 12h20"/>
            </svg>
          </div>
          <p className="font-display text-xl text-foreground mb-2">No matches scheduled</p>
          <p className="font-sans text-sm text-muted-foreground">
            {activeFilter === "all"
              ? "No matches right now. Check back soon."
              : `No ${activeFilter} matches scheduled. Try 'All Matches'.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PortalMatches;
