import { useAuth } from "@/hooks/useAuth";
import { useCurrentProfile } from "@/hooks/useProfile";
import { useUpcomingSessions } from "@/hooks/useSessions";
import { useCurrentUserRank } from "@/hooks/useLeaderboard";
import { SessionCard } from "@/components/portal/SessionCard";
import { format } from "date-fns";

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      className="rounded-lg p-5"
      style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}
    >
      <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-2">{label}</p>
      <p className="font-display text-2xl text-foreground">{value}</p>
      {sub && <p className="font-sans text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/4 rounded animate-pulse ${className}`} />;
}

const PortalHome = () => {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useCurrentProfile();
  const { data: sessions, isLoading: sessionsLoading } = useUpcomingSessions(3);
  const { data: rank } = useCurrentUserRank();

  const firstName = profile?.name?.split(" ")[0] || "Member";
  const memberSince = profile?.member_since
    ? format(new Date(profile.member_since), "MMMM yyyy")
    : null;

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-2">
          {format(new Date(), "EEEE, d MMMM")}
        </p>
        {profileLoading ? (
          <Skeleton className="h-9 w-48" />
        ) : (
          <h1 className="font-display text-3xl md:text-4xl text-foreground">
            Welcome back, <span className="gold-text">{firstName}</span>
          </h1>
        )}
        {memberSince && (
          <p className="font-sans text-xs text-muted-foreground mt-2">Member since {memberSince}</p>
        )}
      </div>

      {/* Stats */}
      <div>
        <h2 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Your Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Sessions Played"
            value={rank?.sessionsAttended ?? "—"}
          />
          <StatCard
            label="Current Streak"
            value={rank?.streak ? `${rank.streak}🔥` : "—"}
            sub={rank?.streak ? "sessions" : "Start a streak"}
          />
          <StatCard
            label="Total Points"
            value={rank?.points ?? "—"}
          />
          <StatCard
            label="Club Rank"
            value={rank?.rank ? `#${rank.rank}` : "—"}
            sub="among members"
          />
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">
            Upcoming This Week
          </h2>
          <a
            href="/portal/matches"
            className="font-sans text-[0.65rem] tracking-wider uppercase text-primary hover:text-primary/80 transition-colors"
          >
            View all →
          </a>
        </div>

        {sessionsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 rounded-lg" />
            ))}
          </div>
        ) : sessions && sessions.length > 0 ? (
          <div className="space-y-3">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-lg p-10 text-center"
            style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}
          >
            <p className="font-display text-xl text-foreground mb-2">The courts are yours</p>
            <p className="font-sans text-sm text-muted-foreground">
              No sessions scheduled yet. Check back soon.
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/portal/events", label: "Club Events", desc: "VIP nights & social events" },
          { href: "/portal/lounge", label: "The Lounge", desc: "Member community feed" },
          { href: "/portal/profile", label: "My Profile", desc: "Edit your member profile" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-1 rounded-lg p-5 transition-all duration-300"
            style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(39 45% 61% / 0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 11%)";
            }}
          >
            <span className="font-display text-base text-foreground group-hover:text-primary transition-colors">
              {item.label}
            </span>
            <span className="font-sans text-xs text-muted-foreground">{item.desc}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PortalHome;
