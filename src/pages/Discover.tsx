import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { MapPreview } from "@/components/MapPreview";
import { QuickFilters } from "@/components/QuickFilters";
import { LiveSessionBanner } from "@/components/LiveSessionBanner";
import { SessionCard, SportType } from "@/components/SessionCard";
import { ProfileCard } from "@/components/ProfileCard";
import { StatsRow } from "@/components/StatsRow";
import { EmergencySessionButton } from "@/components/EmergencySessionButton";
import { CreateSessionButton } from "@/components/CreateSessionButton";
import { TopMatchCard } from "@/components/TopMatchCard";
import { LessonsFeed, Lesson } from "@/components/LessonsFeed";
import { TrendingAlphaSidebar } from "@/components/TrendingAlphaSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionIntent } from "@/components/SessionIntentBadge";
import { MemberTier } from "@/components/MemberTierBadge";
import { EnergyStyle } from "@/components/EnergyBadge";
import { CryptoFocus } from "@/components/CryptoFocusBadge";

// Mock data for sessions
const mockSessions = [
  {
    id: "1",
    sport: "padel" as SportType,
    title: "Morning Padel - DeFi Founders",
    location: "Dubai Marina Courts",
    time: "8:00 AM",
    spotsLeft: 2,
    totalSpots: 4,
    skillLevel: "Intermediate",
    isLive: true,
    cryptoFocus: "DeFi",
    sessionIntent: ["fundraising", "social_networking"] as SessionIntent[],
    host: { name: "Ahmed", role: "Founder @ TradeFi" },
  },
  {
    id: "2",
    sport: "tennis" as SportType,
    title: "Evening Tennis - VC Meet",
    location: "Al Habtoor Courts",
    time: "6:00 PM",
    spotsLeft: 1,
    totalSpots: 2,
    skillLevel: "Advanced",
    cryptoFocus: "Venture Capital",
    sessionIntent: ["hiring"] as SessionIntent[],
    host: { name: "Sarah", role: "Partner @ Blockchain VC" },
  },
  {
    id: "3",
    sport: "gym" as SportType,
    title: "Power Hour - Crypto Builders",
    location: "Fitness First DIFC",
    time: "7:00 AM",
    spotsLeft: 5,
    totalSpots: 8,
    skillLevel: "All Levels",
    sessionIntent: ["alpha_only"] as SessionIntent[],
    host: { name: "Mike", role: "CTO @ Web3 Labs" },
  },
];

// Mock data for profiles
const mockProfiles = [
  {
    name: "Alex Chen",
    city: "Dubai",
    role: "Founder",
    sports: ["Padel", "Gym"],
    isOnline: true,
    reliability: 94,
    memberTier: "elite" as MemberTier,
    energyStyle: "competitive" as EnergyStyle,
    cryptoFocus: ["defi", "trading"] as CryptoFocus[],
  },
  {
    name: "Maria Santos",
    city: "Dubai",
    role: "VC Partner",
    sports: ["Tennis", "Yoga"],
    isOnline: false,
    reliability: 98,
    memberTier: "inner_circle" as MemberTier,
    energyStyle: "strategic" as EnergyStyle,
    cryptoFocus: ["vc", "infra"] as CryptoFocus[],
  },
  {
    name: "James Wilson",
    city: "Abu Dhabi",
    role: "Developer",
    sports: ["Running", "Combat"],
    isOnline: true,
    reliability: 87,
    memberTier: "core" as MemberTier,
    energyStyle: "social" as EnergyStyle,
    cryptoFocus: ["ai", "gaming"] as CryptoFocus[],
  },
];

// Mock lessons data
const mockLessons: Lesson[] = [
  {
    id: "1",
    lessonText: "Realized that the best deals happen on the court, not in boardrooms. Closed a $2M round after a padel match with my now-investor.",
    authorName: "Sarah Kim",
    authorRole: "Founder",
    authorEnergyStyle: "competitive",
    sport: "padel",
    sessionTitle: "Morning Padel - DeFi Founders",
    mood: "energized",
    upvotesCount: 24,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    lessonText: "Physical exhaustion creates mental clarity. My best product decisions come right after an intense gym session.",
    authorName: "Marcus Chen",
    authorRole: "CTO",
    authorEnergyStyle: "strategic",
    sport: "gym",
    mood: "focused",
    upvotesCount: 18,
    hasUpvoted: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock top match data
const topMatch = {
  name: "Victoria Chen",
  avatarUrl: "",
  energyStyle: "Competitive",
  cryptoFocus: ["DeFi", "Trading"],
  city: "Dubai Marina",
  matchScore: 92,
  matchReasons: [
    { type: "energy" as const, text: "Same competitive energy style" },
    { type: "crypto" as const, text: "Both focused on DeFi protocols" },
    { type: "skill" as const, text: "Matched padel skill level" },
  ],
};

export const Discover: React.FC = () => {
  const [activeSport, setActiveSport] = useState("all");
  const [activeIntent, setActiveIntent] = useState<string | null>(null);

  const filteredSessions = mockSessions.filter((session) => {
    if (activeSport !== "all" && session.sport !== activeSport) return false;
    if (activeIntent && !session.sessionIntent?.includes(activeIntent as SessionIntent)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-md mx-auto px-4 pb-32 pt-4">
        {/* Stats Row */}
        <section className="mb-6">
          <StatsRow />
        </section>

        {/* Emergency Session CTA */}
        <section className="mb-6">
          <EmergencySessionButton />
        </section>

        {/* Map Preview */}
        <section className="mb-6">
          <MapPreview />
        </section>

        {/* Filters */}
        <section className="mb-6">
          <QuickFilters
            onSportChange={setActiveSport}
            onIntentChange={setActiveIntent}
          />
        </section>

        {/* Live Session Banner */}
        <section className="mb-6">
          <LiveSessionBanner />
        </section>

        {/* Top Match Suggestion */}
        <section className="mb-6">
          <TopMatchCard
            {...topMatch}
            onConnect={() => console.log("Connect clicked")}
          />
        </section>

        {/* Trending Alpha Sidebar (collapsed view) */}
        <section className="mb-6">
          <TrendingAlphaSidebar />
        </section>

        {/* Tabbed Content */}
        <Tabs defaultValue="sessions" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <SessionCard key={session.id} {...session} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No sessions found for this filter.</p>
                <p className="text-sm mt-2">Try adjusting your filters or create a new session.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="people" className="space-y-4">
            {mockProfiles.map((profile, index) => (
              <ProfileCard key={index} {...profile} />
            ))}
          </TabsContent>

          <TabsContent value="lessons">
            <LessonsFeed
              lessons={mockLessons}
              onUpvote={(id) => console.log("Upvote lesson:", id)}
            />
          </TabsContent>
        </Tabs>
      </main>

      <CreateSessionButton />
      <BottomNav />
    </div>
  );
};

export default Discover;
