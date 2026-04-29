import { useState } from "react";
import { useSessions } from "@/hooks/useSessions";
import { SessionCard } from "@/components/portal/SessionCard";
import { Database } from "@/integrations/supabase/types";

type SkillLevel = Database["public"]["Enums"]["skill_level"];
type Filter = "all" | SkillLevel;

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/4 rounded animate-pulse ${className}`} />;
}

const SKILL_FILTERS: { value: Filter; label: string; color: string }[] = [
  { value: "all", label: "All Levels", color: "" },
  { value: "beginner", label: "Beginner", color: "text-emerald-400" },
  { value: "intermediate", label: "Intermediate", color: "text-amber-400" },
  { value: "advanced", label: "Advanced", color: "text-red-400" },
];

const PortalTraining = () => {
  const [skillFilter, setSkillFilter] = useState<Filter>("all");

  const { data: sessions, isLoading } = useSessions({
    sessionIntent: "training",
    skillLevel: skillFilter !== "all" ? skillFilter : undefined,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Padel House
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground">Training</h1>
        <p className="font-sans text-sm text-muted-foreground mt-2">
          Coach-led sessions, drills, and development programs.
        </p>
      </div>

      {/* Skill filters */}
      <div className="flex flex-wrap gap-2">
        {SKILL_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setSkillFilter(f.value)}
            className={`px-4 py-2 rounded-full font-sans text-[0.7rem] tracking-wide border transition-all duration-200 ${
              skillFilter === f.value
                ? "bg-primary text-primary-foreground border-primary"
                : `border-border/50 text-muted-foreground hover:text-foreground hover:border-border ${f.color}`
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Sessions */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-48 rounded-lg" />)}
        </div>
      ) : sessions && sessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((session) => (
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
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <p className="font-display text-xl text-foreground mb-2">No training sessions</p>
          <p className="font-sans text-sm text-muted-foreground">
            {skillFilter === "all"
              ? "No training sessions scheduled yet."
              : `No ${skillFilter} sessions right now. Try another level.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PortalTraining;
