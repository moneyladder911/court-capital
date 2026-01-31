import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { TopMatchCard } from "@/components/TopMatchCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MapPin,
  Zap,
  Star,
  Users,
  ArrowRight,
  RefreshCw,
  Check,
  X,
  Heart,
  Filter,
} from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon } from "@/components/icons/SportIcons";
import { calculateMatchScore, MatchReason } from "@/lib/matchScoreCalculator";
import { EnergyBadge } from "@/components/EnergyBadge";
import { CryptoFocusBadge } from "@/components/CryptoFocusBadge";

// Mock current user profile for matching
const currentUserProfile = {
  energyStyle: "competitive",
  cryptoFocus: ["defi", "ai", "trading"],
  city: "Dubai",
  skillLevel: 8,
};

interface Match {
  id: string;
  name: string;
  role: string;
  city: string;
  mindset: string;
  energyStyle: "competitive" | "social" | "strategic" | "learning";
  cryptoFocus: string[];
  sports: { name: string; skill: number }[];
  reliability: number;
  compatibility: number;
  isOnline: boolean;
  matchReason: string;
  matchScore?: number;
  matchReasons?: MatchReason[];
}

const mockMatches: Match[] = [
  {
    id: "1",
    name: "Marcus W.",
    role: "VC Partner",
    city: "Dubai",
    mindset: "Investor",
    energyStyle: "competitive",
    cryptoFocus: ["defi", "vc"],
    sports: [
      { name: "Padel", skill: 8 },
      { name: "Golf", skill: 7 },
    ],
    reliability: 96,
    compatibility: 94,
    isOnline: true,
    matchReason: "Same skill level in Padel • Investor mindset • Active in Dubai",
  },
  {
    id: "2",
    name: "Elena K.",
    role: "Founder",
    city: "Dubai",
    mindset: "Builder",
    energyStyle: "strategic",
    cryptoFocus: ["ai", "infra"],
    sports: [
      { name: "Tennis", skill: 7 },
      { name: "Running", skill: 8 },
    ],
    reliability: 92,
    compatibility: 88,
    isOnline: true,
    matchReason: "Builder mindset • High reliability • Looking for morning sessions",
  },
  {
    id: "3",
    name: "Alex C.",
    role: "Trader",
    city: "Singapore",
    mindset: "Competitor",
    energyStyle: "competitive",
    cryptoFocus: ["trading", "defi"],
    sports: [
      { name: "Combat", skill: 9 },
      { name: "Gym", skill: 8 },
    ],
    reliability: 98,
    compatibility: 85,
    isOnline: false,
    matchReason: "Competitive mindset • Elite combat skills • High achiever",
  },
];

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

const Matchmaking = () => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"swipe" | "list">("list");

  // Calculate match scores for all profiles
  const rankedMatches = useMemo(() => {
    return mockMatches.map((match) => {
      const { score, reasons } = calculateMatchScore(
        {
          energyStyle: currentUserProfile.energyStyle,
          cryptoFocus: currentUserProfile.cryptoFocus,
          city: currentUserProfile.city,
          skillLevel: currentUserProfile.skillLevel,
        },
        {
          energyStyle: match.energyStyle,
          cryptoFocus: match.cryptoFocus,
          city: match.city,
          skillLevel: match.sports[0]?.skill || 5,
        }
      );
      return { ...match, matchScore: score, matchReasons: reasons };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, []);

  const topMatch = rankedMatches[0];
  const otherMatches = rankedMatches.slice(1);
  const currentMatch = rankedMatches[currentMatchIndex];

  const handleNext = () => {
    setCurrentMatchIndex((prev) => (prev + 1) % rankedMatches.length);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Smart Matchmaking
            </h1>
            <p className="text-sm text-muted-foreground">Energy Style + Crypto Focus alignment</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "gold" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <Users className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "swipe" ? "gold" : "outline"}
              size="sm"
              onClick={() => setViewMode("swipe")}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Match Criteria */}
        <div className="glass-card rounded-xl p-4 border border-border-gold">
          <h3 className="text-sm font-medium text-foreground mb-3">Matching You By</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="gold-outline">Padel • Skill 7-9</Badge>
            <Badge variant="gold-outline">Dubai</Badge>
            <Badge variant="gold-outline">Founders & VCs</Badge>
            <Badge variant="gold-outline">Morning Sessions</Badge>
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full text-muted-foreground">
            Adjust Preferences <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Swipe View */}
        {viewMode === "swipe" && currentMatch && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-border-gold relative overflow-hidden">
              {/* Compatibility Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="gold" className="text-sm">
                  {currentMatch.compatibility}% Match
                </Badge>
              </div>

              {/* Profile */}
              <div className="text-center mb-4">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                    <span className="text-4xl font-bold text-primary-foreground">
                      {currentMatch.name.charAt(0)}
                    </span>
                  </div>
                  {currentMatch.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-2 border-background" />
                  )}
                </div>

                <h2 className="font-display text-xl font-bold text-foreground mb-1">
                  {currentMatch.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge variant="role">{currentMatch.role}</Badge>
                  <Badge variant="muted">{currentMatch.mindset}</Badge>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{currentMatch.city}</span>
                  <span className="text-border mx-1">•</span>
                  <span className="text-success">{currentMatch.reliability}% Reliable</span>
                </div>
              </div>

              {/* Sports */}
              <div className="flex justify-center gap-3 mb-4">
                {currentMatch.sports.map((sport) => (
                  <div
                    key={sport.name}
                    className="glass-card rounded-xl p-3 text-center min-w-[80px]"
                  >
                    <div className="text-primary mb-1 flex justify-center">
                      {getSportIcon(sport.name)}
                    </div>
                    <div className="text-xs text-foreground font-medium">{sport.name}</div>
                    <div className="text-xs text-primary">{sport.skill}/10</div>
                  </div>
                ))}
              </div>

              {/* Match Reason */}
              <div className="bg-card/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  Why you match
                </div>
                <p className="text-sm text-foreground">{currentMatch.matchReason}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full"
                onClick={handleNext}
              >
                <X className="w-6 h-6" />
              </Button>
              <Button
                variant="gold"
                size="icon"
                className="w-16 h-16 rounded-full shadow-gold"
              >
                <Check className="w-7 h-7" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full"
                onClick={handleNext}
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {currentMatchIndex + 1} of {mockMatches.length} matches
            </p>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {/* Top Match Highlight */}
            {topMatch && (
              <TopMatchCard
                name={topMatch.name}
                avatarUrl={undefined}
                energyStyle={topMatch.energyStyle}
                cryptoFocus={topMatch.cryptoFocus}
                city={topMatch.city}
                matchScore={topMatch.matchScore || 0}
                matchReasons={topMatch.matchReasons || []}
                onConnect={() => console.log("Connect with", topMatch.name)}
              />
            )}

            {/* Other Matches */}
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <h2 className="font-medium text-foreground">Other Matches</h2>
              <Badge variant="muted" className="text-xs">
                {otherMatches.length} found
              </Badge>
            </div>

            {otherMatches.map((match, index) => (
              <div
                key={match.id}
                className="glass-card rounded-xl p-4 card-hover border border-transparent hover:border-border-gold transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-foreground">
                        {match.name.charAt(0)}
                      </span>
                    </div>
                    {match.isOnline && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-background" />
                    )}
                    <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {index + 2}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{match.name}</h3>
                      <Badge variant="gold" className="text-xs">
                        {match.matchScore || match.compatibility}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Badge variant="role" className="text-xs">{match.role}</Badge>
                      <span className="text-border">•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{match.city}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <EnergyBadge energy={match.energyStyle} size="sm" />
                      {match.cryptoFocus.slice(0, 2).map((focus) => (
                        <CryptoFocusBadge 
                          key={focus} 
                          focus={focus.toLowerCase() as "defi" | "ai" | "infra" | "trading" | "vc" | "founder" | "gaming" | "nft" | "security" | "dao"} 
                          size="sm" 
                        />
                      ))}
                    </div>
                    {match.matchReasons && match.matchReasons.length > 0 && (
                      <p className="text-xs text-muted-foreground italic">
                        <Sparkles className="w-3 h-3 inline mr-1 text-primary" />
                        {match.matchReasons[0]?.text || match.matchReason}
                      </p>
                    )}
                  </div>

                  <Button variant="gold" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Matchmaking;
