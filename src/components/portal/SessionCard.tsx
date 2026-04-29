import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useJoinSession, useLeaveSession } from "@/hooks/useSessions";
import { useUserParticipation } from "@/hooks/useSessionParticipation";
import type { SessionWithHost } from "@/hooks/useSessions";

const SKILL_COLORS: Record<string, string> = {
  beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  advanced: "text-red-400 bg-red-400/10 border-red-400/20",
  open: "text-blue-400 bg-blue-400/10 border-blue-400/20",
};

const INTENT_LABELS: Record<string, string> = {
  competitive: "League",
  social: "Social",
  training: "Training",
  casual: "Casual",
};

interface SessionCardProps {
  session: SessionWithHost;
}

export function SessionCard({ session }: SessionCardProps) {
  const { user } = useAuth();
  const { data: participation } = useUserParticipation(session.id);
  const joinSession = useJoinSession();
  const leaveSession = useLeaveSession();

  const isJoined = !!participation;
  const isHost = session.host_id === user?.id;
  const spotsLeft = session.max_participants
    ? session.max_participants - (session.participantCount || 0)
    : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  const skillColor = SKILL_COLORS[session.skill_level || "open"] || SKILL_COLORS.open;
  const intentLabel = session.session_intent?.map((i) => INTENT_LABELS[i] || i).join(" · ") || "Open";

  const scheduledDate = new Date(session.scheduled_at);

  const handleRsvp = () => {
    if (isHost) return;
    if (isJoined) {
      leaveSession.mutate(session.id);
    } else {
      joinSession.mutate(session.id);
    }
  };

  return (
    <div
      className="group relative rounded-lg p-5 transition-all duration-300 cursor-default"
      style={{
        background: "hsl(0 0% 6%)",
        border: "1px solid hsl(0 0% 11%)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(39 45% 61% / 0.25)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px -8px hsl(39 45% 61% / 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 11%)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base text-foreground leading-tight mb-1 truncate">
            {session.title}
          </h3>
          <p className="font-sans text-[0.7rem] text-muted-foreground">{intentLabel}</p>
        </div>
        {session.skill_level && (
          <span className={`flex-shrink-0 font-sans text-[0.6rem] tracking-widest uppercase px-2 py-1 rounded border ${skillColor}`}>
            {session.skill_level}
          </span>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
        <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {format(scheduledDate, "EEE d MMM")}
        </span>
        <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          {format(scheduledDate, "HH:mm")}
          {session.duration_minutes ? ` · ${session.duration_minutes}min` : ""}
        </span>
        <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          {session.location}
        </span>
        {spotsLeft !== null && (
          <span className={`flex items-center gap-1.5 font-sans text-xs ${isFull ? "text-red-400/70" : "text-muted-foreground"}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {isFull ? "Full" : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
          </span>
        )}
      </div>

      {/* Host */}
      {session.host && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="font-sans text-[0.5rem] font-medium text-primary">
              {session.host.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </span>
          </div>
          <span className="font-sans text-xs text-muted-foreground">
            {isHost ? "You (host)" : `Hosted by ${session.host.name}`}
          </span>
        </div>
      )}

      {/* RSVP button */}
      {!isHost && (
        <button
          onClick={handleRsvp}
          disabled={(!isJoined && isFull) || joinSession.isPending || leaveSession.isPending}
          className={`w-full py-2.5 font-sans text-[0.65rem] tracking-[0.15em] uppercase transition-all duration-300 rounded ${
            isJoined
              ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/5"
              : isFull
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {joinSession.isPending || leaveSession.isPending
            ? "..."
            : isJoined
            ? "✓ Joined — Cancel"
            : isFull
            ? "Session Full"
            : "Join Session"}
        </button>
      )}
      {isHost && (
        <div className="w-full py-2 text-center font-sans text-[0.65rem] tracking-widest uppercase text-muted-foreground">
          You're hosting this
        </div>
      )}
    </div>
  );
}
