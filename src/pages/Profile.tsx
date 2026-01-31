import React from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, MapPin, Calendar, Edit2, MessageCircle } from "lucide-react";
import { MemberTierBadge, TierRing } from "@/components/MemberTierBadge";
import { EnergyBadge } from "@/components/EnergyBadge";
import { CryptoFocusList } from "@/components/CryptoFocusBadge";
import { TrustScoreIndicator } from "@/components/TrustScoreIndicator";
import { ReputationTierBadge } from "@/components/ReputationTierBadge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Mock profile data - in production this would come from the database
  const profile = {
    name: "Alex Johnson",
    role: "Founder @ CryptoFit",
    city: "Dubai, UAE",
    bio: "Building the future of fitness x crypto. Padel enthusiast and early morning gym rat. Let's connect!",
    memberSince: "Jan 2025",
    memberTier: "elite" as const,
    reputationTier: "pioneer" as const,
    energyStyle: "competitive" as const,
    trustScore: 92,
    cryptoFocus: ["defi", "founder", "trading"] as const,
    sports: ["Padel", "Gym", "Running"],
    stats: {
      sessionsHosted: 12,
      sessionsJoined: 34,
      connections: 156,
      lessonsShared: 8,
    },
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-md mx-auto px-4 pb-32 pt-4">
          <div className="glass-card rounded-xl p-8 text-center">
            <h2 className="font-display text-xl font-bold mb-4">Welcome to CHAINPLAY</h2>
            <p className="text-muted-foreground mb-6">
              Sign in to access your profile, connect with other members, and join sessions.
            </p>
            <Button variant="gold" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-md mx-auto px-4 pb-32 pt-4">
        {/* Profile Header */}
        <div className="glass-card rounded-xl p-6 mb-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-5 h-5" />
          </Button>

          <div className="flex items-start gap-4 mb-4">
            <TierRing tier={profile.memberTier}>
              <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {profile.name.charAt(0)}
                </span>
              </div>
            </TierRing>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-xl font-bold">{profile.name}</h1>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{profile.role}</p>
              <div className="flex flex-wrap gap-2">
                <MemberTierBadge tier={profile.memberTier} size="sm" />
                <ReputationTierBadge tier={profile.reputationTier} size="sm" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Since {profile.memberSince}</span>
            </div>
          </div>

          <p className="text-sm text-foreground/80 mb-4">{profile.bio}</p>

          <div className="flex items-center gap-2 mb-4">
            <EnergyBadge energy={profile.energyStyle} />
          </div>

          <CryptoFocusList focuses={[...profile.cryptoFocus]} size="md" />

          <div className="flex gap-2 mt-4">
            <Button variant="gold" className="flex-1" onClick={() => navigate("/edit-profile")}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate("/messages")}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{profile.stats.sessionsHosted}</p>
            <p className="text-xs text-muted-foreground">Sessions Hosted</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{profile.stats.sessionsJoined}</p>
            <p className="text-xs text-muted-foreground">Sessions Joined</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{profile.stats.connections}</p>
            <p className="text-xs text-muted-foreground">Connections</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{profile.stats.lessonsShared}</p>
            <p className="text-xs text-muted-foreground">Lessons Shared</p>
          </div>
        </div>

        {/* Trust Score */}
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold mb-1">Trust Score</h3>
              <p className="text-sm text-muted-foreground">
                Based on attendance, feedback & activity
              </p>
            </div>
            <TrustScoreIndicator score={profile.trustScore} size="lg" showLabel={false} />
          </div>
        </div>

        {/* Sports */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold mb-3">Sports</h3>
          <div className="flex flex-wrap gap-2">
            {profile.sports.map((sport) => (
              <Badge key={sport} variant="muted" className="text-sm">
                {sport}
              </Badge>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
