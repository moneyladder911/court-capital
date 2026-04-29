import { useState } from "react";
import { useCurrentProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useCurrentUserRank } from "@/hooks/useLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { MemberAvatar } from "@/components/portal/MemberAvatar";
import { format } from "date-fns";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/4 rounded animate-pulse ${className}`} />;
}

const TIER_COLORS: Record<string, string> = {
  explorer: "text-muted-foreground",
  member: "text-blue-400",
  elite: "text-amber-400",
  founder: "text-primary",
};

const PortalProfile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useCurrentProfile();
  const { data: rank } = useCurrentUserRank();
  const updateProfile = useUpdateProfile();

  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState("");

  const handleSaveBio = async () => {
    await updateProfile.mutateAsync({ bio });
    setEditingBio(false);
  };

  const memberSince = profile?.member_since
    ? format(new Date(profile.member_since), "MMMM yyyy")
    : profile?.created_at
    ? format(new Date(profile.created_at), "MMMM yyyy")
    : "—";

  const tierColor = TIER_COLORS[profile?.member_tier || "member"] || "text-foreground";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-2">Padel House</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground">My Profile</h1>
      </div>

      {/* Profile card */}
      <div className="rounded-xl p-8" style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}>
        <div className="flex items-start gap-6">
          <MemberAvatar
            name={profile?.name || user?.email || "Member"}
            avatarUrl={profile?.avatar_url}
            isOnline={profile?.is_online ?? false}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl text-foreground">{profile?.name || "Member"}</h2>
            <p className={`font-sans text-[0.7rem] tracking-widest uppercase mt-1 ${tierColor}`}>
              {profile?.member_tier || "Member"}
            </p>
            {profile?.city && (
              <p className="font-sans text-xs text-muted-foreground mt-1">{profile.city}</p>
            )}
            <p className="font-sans text-xs text-muted-foreground mt-1">Member since {memberSince}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 pt-6 border-t border-border/40">
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-[0.6rem] tracking-widest uppercase text-muted-foreground">About</p>
            {!editingBio && (
              <button
                onClick={() => { setEditingBio(true); setBio(profile?.bio || ""); }}
                className="font-sans text-[0.65rem] text-muted-foreground hover:text-primary transition-colors"
              >
                Edit
              </button>
            )}
          </div>
          {editingBio ? (
            <div className="space-y-3">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell the house about yourself..."
                className="w-full bg-transparent border border-border/50 rounded-lg p-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveBio}
                  disabled={updateProfile.isPending}
                  className="px-4 py-2 bg-primary text-primary-foreground font-sans text-[0.65rem] tracking-[0.15em] uppercase rounded transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {updateProfile.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditingBio(false)}
                  className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              {profile?.bio || "No bio yet. Add one to introduce yourself to the house."}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div>
        <h3 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-4">Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Sessions Attended", value: rank?.sessionsAttended ?? "—" },
            { label: "Current Streak", value: rank?.streak ? `${rank.streak} 🔥` : "—" },
            { label: "Total Points", value: rank?.points ?? "—" },
            { label: "Club Rank", value: rank?.rank ? `#${rank.rank}` : "—" },
            { label: "Trust Score", value: profile?.trust_score ?? "—" },
            { label: "Attendance Rate", value: profile?.attendance_rate ? `${Math.round((profile.attendance_rate as number) * 100)}%` : "—" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg p-4" style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}>
              <p className="font-sans text-[0.55rem] tracking-widest uppercase text-muted-foreground mb-1">{stat.label}</p>
              <p className="font-display text-xl text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email */}
      <div className="rounded-lg p-5" style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}>
        <p className="font-sans text-[0.6rem] tracking-widest uppercase text-muted-foreground mb-1">Account Email</p>
        <p className="font-sans text-sm text-foreground">{user?.email}</p>
      </div>
    </div>
  );
};

export default PortalProfile;
