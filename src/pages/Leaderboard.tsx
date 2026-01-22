import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Crown, Trophy, Medal, Flame, Star, TrendingUp, Target, Users } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar?: string;
  role: string;
  city: string;
  points: number;
  streak: number;
  sessionsAttended: number;
  badges: string[];
  change: number; // positive = moved up, negative = moved down
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Viktor K.",
    role: "Founder",
    city: "Dubai",
    points: 2450,
    streak: 12,
    sessionsAttended: 45,
    badges: ["👑", "🏆", "🔥"],
    change: 0,
  },
  {
    rank: 2,
    name: "Marcus W.",
    role: "VC",
    city: "Miami",
    points: 2280,
    streak: 8,
    sessionsAttended: 38,
    badges: ["🥇", "⭐"],
    change: 2,
  },
  {
    rank: 3,
    name: "Elena M.",
    role: "Investor",
    city: "Dubai",
    points: 2150,
    streak: 15,
    sessionsAttended: 42,
    badges: ["🥈", "💎"],
    change: -1,
  },
  {
    rank: 4,
    name: "Alex C.",
    role: "Founder",
    city: "Singapore",
    points: 1980,
    streak: 6,
    sessionsAttended: 35,
    badges: ["🎯"],
    change: 1,
  },
  {
    rank: 5,
    name: "Sarah T.",
    role: "Trader",
    city: "London",
    points: 1875,
    streak: 9,
    sessionsAttended: 31,
    badges: ["🚀"],
    change: -2,
  },
  {
    rank: 6,
    name: "James W.",
    role: "Dev",
    city: "Dubai",
    points: 1720,
    streak: 4,
    sessionsAttended: 28,
    badges: [],
    change: 3,
  },
  {
    rank: 7,
    name: "Maria S.",
    role: "VC",
    city: "Miami",
    points: 1650,
    streak: 7,
    sessionsAttended: 26,
    badges: [],
    change: 0,
  },
  {
    rank: 8,
    name: "David L.",
    role: "Marketer",
    city: "Lisbon",
    points: 1580,
    streak: 5,
    sessionsAttended: 24,
    badges: [],
    change: -1,
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-primary" />;
    case 2:
      return <Trophy className="w-5 h-5 text-muted-foreground" />;
    case 3:
      return <Medal className="w-5 h-5 text-accent" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const Leaderboard = () => {
  const [filter, setFilter] = useState<"global" | "city" | "sport">("global");
  const [timeframe, setTimeframe] = useState<"week" | "month" | "alltime">("month");

  // Mock current user stats
  const currentUserRank = 12;
  const currentUserPoints = 980;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Your Position Card */}
        <div className="glass-card rounded-xl p-4 border border-border-gold">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-foreground">Your Position</h2>
            <Badge variant="gold">#{currentUserRank}</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gradient-gold">{currentUserPoints}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-live" />5
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">18</div>
              <div className="text-xs text-muted-foreground">Sessions</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next rank: #11</span>
              <span className="text-primary font-medium">+45 pts needed</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-gold rounded-full" style={{ width: "78%" }} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: "global", label: "Global", icon: <Star className="w-4 h-4" /> },
            { id: "city", label: "Dubai", icon: <Target className="w-4 h-4" /> },
            { id: "sport", label: "Padel", icon: <Users className="w-4 h-4" /> },
          ].map((f) => (
            <button
              key={f.id}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
              onClick={() => setFilter(f.id as typeof filter)}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Timeframe */}
        <div className="flex gap-2">
          {["week", "month", "alltime"].map((t) => (
            <button
              key={t}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                timeframe === t
                  ? "bg-card border border-border-gold text-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setTimeframe(t as typeof timeframe)}
            >
              {t === "alltime" ? "All Time" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-2 py-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-card border-2 border-muted flex items-center justify-center mb-2">
              <span className="text-lg font-bold">M</span>
            </div>
            <div className="glass-card rounded-t-xl p-3 text-center w-24 h-20">
              <Trophy className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
              <p className="text-xs font-medium truncate">{mockLeaderboard[1].name}</p>
              <p className="text-xs text-primary font-bold">{mockLeaderboard[1].points}</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="w-16 h-16 rounded-full bg-gradient-gold border-2 border-primary flex items-center justify-center mb-2 shadow-gold">
              <span className="text-xl font-bold text-primary-foreground">V</span>
            </div>
            <div className="glass-card rounded-t-xl p-3 text-center w-28 h-24 border border-border-gold">
              <Crown className="w-6 h-6 mx-auto text-primary mb-1" />
              <p className="text-sm font-medium truncate">{mockLeaderboard[0].name}</p>
              <p className="text-sm text-primary font-bold">{mockLeaderboard[0].points}</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-card border-2 border-accent flex items-center justify-center mb-2">
              <span className="text-lg font-bold">E</span>
            </div>
            <div className="glass-card rounded-t-xl p-3 text-center w-24 h-16">
              <Medal className="w-5 h-5 mx-auto text-accent mb-1" />
              <p className="text-xs font-medium truncate">{mockLeaderboard[2].name}</p>
              <p className="text-xs text-primary font-bold">{mockLeaderboard[2].points}</p>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2">
          {mockLeaderboard.slice(3).map((entry) => (
            <div
              key={entry.rank}
              className="glass-card rounded-xl p-3 flex items-center gap-3"
            >
              <div className="w-8 flex justify-center">{getRankIcon(entry.rank)}</div>
              <div className="w-10 h-10 rounded-full bg-gradient-card border border-border flex items-center justify-center">
                <span className="font-bold text-primary">{entry.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm truncate">
                    {entry.name}
                  </span>
                  <Badge variant="muted" className="text-xs">{entry.role}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{entry.city}</span>
                  <span className="text-border">•</span>
                  <Flame className="w-3 h-3 text-live" />
                  <span>{entry.streak}d</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{entry.points}</div>
                <div className={`text-xs flex items-center gap-0.5 ${
                  entry.change > 0 ? "text-success" : entry.change < 0 ? "text-live" : "text-muted-foreground"
                }`}>
                  {entry.change > 0 && <TrendingUp className="w-3 h-3" />}
                  {entry.change !== 0 && (entry.change > 0 ? `+${entry.change}` : entry.change)}
                  {entry.change === 0 && "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav activeTab="leaderboard" onTabChange={() => {}} />
    </div>
  );
};

export default Leaderboard;
