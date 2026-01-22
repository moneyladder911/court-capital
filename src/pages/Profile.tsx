import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Zap,
  Settings,
  Edit,
  Trophy,
  Users,
  Calendar,
  Star,
  Flame,
  Award,
  LogOut,
  Shield,
  Crown,
} from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon } from "@/components/icons/SportIcons";

interface UserProfile {
  name: string;
  city: string;
  bio: string;
  role: string;
  mindset: string;
  isVerified: boolean;
  isVIP: boolean;
  stats: {
    sessionsAttended: number;
    connectionsCount: number;
    eventsAttended: number;
    reliability: number;
    streak: number;
    points: number;
    rank: number;
  };
  sports: {
    name: string;
    skillLevel: number;
  }[];
  badges: {
    icon: string;
    name: string;
    description: string;
  }[];
}

const mockProfile: UserProfile = {
  name: "Viktor K.",
  city: "Dubai, UAE",
  bio: "Building the future of Web3. Competitive padel player and fitness enthusiast. Let's connect on the court.",
  role: "Founder",
  mindset: "Builder",
  isVerified: true,
  isVIP: true,
  stats: {
    sessionsAttended: 45,
    connectionsCount: 128,
    eventsAttended: 12,
    reliability: 94,
    streak: 12,
    points: 2450,
    rank: 1,
  },
  sports: [
    { name: "Padel", skillLevel: 8 },
    { name: "Golf", skillLevel: 6 },
    { name: "Gym", skillLevel: 9 },
    { name: "Running", skillLevel: 7 },
  ],
  badges: [
    { icon: "👑", name: "VIP Member", description: "Unlocked VIP status" },
    { icon: "🏆", name: "Crypto Padel Champion", description: "Won a padel tournament" },
    { icon: "🔥", name: "Streak Master", description: "7-day session streak" },
    { icon: "💎", name: "Founder Circle", description: "Connected with 10 founders" },
    { icon: "⭐", name: "Reliable Networker", description: "90%+ reliability" },
    { icon: "🎯", name: "First Session", description: "Attended first session" },
  ],
};

const getSportIcon = (sport: string) => {
  switch (sport.toLowerCase()) {
    case "padel":
      return <PadelIcon className="w-4 h-4" />;
    case "tennis":
      return <TennisIcon className="w-4 h-4" />;
    case "golf":
      return <GolfIcon className="w-4 h-4" />;
    case "gym":
      return <GymIcon className="w-4 h-4" />;
    case "running":
      return <RunningIcon className="w-4 h-4" />;
    case "combat":
      return <CombatIcon className="w-4 h-4" />;
    default:
      return null;
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"stats" | "badges" | "activity">("stats");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Profile Header */}
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="text-4xl font-bold text-primary-foreground">
                {mockProfile.name.charAt(0)}
              </span>
            </div>
            {mockProfile.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            {mockProfile.isVIP && (
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center border-2 border-background">
                <Crown className="w-4 h-4 text-background" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {mockProfile.name}
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="gold">{mockProfile.role}</Badge>
            <Badge variant="role">{mockProfile.mindset}</Badge>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span>{mockProfile.city}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{mockProfile.bio}</p>

          <div className="flex gap-2 justify-center">
            <Button variant="gold-outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="glass-card rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xl font-bold text-primary">
              <Crown className="w-4 h-4" />
              #{mockProfile.stats.rank}
            </div>
            <div className="text-xs text-muted-foreground">Rank</div>
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-foreground">{mockProfile.stats.points}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xl font-bold text-live">
              <Flame className="w-4 h-4" />
              {mockProfile.stats.streak}
            </div>
            <div className="text-xs text-muted-foreground">Streak</div>
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-success">{mockProfile.stats.reliability}%</div>
            <div className="text-xs text-muted-foreground">Reliable</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "stats", label: "Stats", icon: <Trophy className="w-4 h-4" /> },
            { id: "badges", label: "Badges", icon: <Award className="w-4 h-4" /> },
            { id: "activity", label: "Activity", icon: <Calendar className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className="space-y-4">
            {/* Activity Stats */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="font-medium text-foreground mb-3">Activity Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{mockProfile.stats.sessionsAttended}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Sessions</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{mockProfile.stats.connectionsCount}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Connections</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{mockProfile.stats.eventsAttended}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Events</div>
                </div>
              </div>
            </div>

            {/* Sports & Skills */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="font-medium text-foreground mb-3">Sports & Skills</h3>
              <div className="space-y-3">
                {mockProfile.sports.map((sport) => (
                  <div key={sport.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-card flex items-center justify-center text-primary">
                      {getSportIcon(sport.name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{sport.name}</span>
                        <span className="text-sm font-bold text-primary">{sport.skillLevel}/10</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-gold rounded-full"
                          style={{ width: `${sport.skillLevel * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Earned Badges</h3>
              <Badge variant="muted">{mockProfile.badges.length} earned</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {mockProfile.badges.map((badge, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-3 text-center border border-border hover:border-border-gold transition-colors"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-foreground truncate">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="space-y-3">
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Won Dubai Padel Championship</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Connected with Marcus W.</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Achieved 10-day streak</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <Button variant="outline" className="w-full text-muted-foreground">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </main>

      <BottomNav activeTab="profile" onTabChange={() => {}} />
    </div>
  );
};

export default Profile;
