import React from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { MapPreview } from "@/components/MapPreview";
import { QuickFilters } from "@/components/QuickFilters";
import { LiveSessionBanner } from "@/components/LiveSessionBanner";
import { SessionCard, SportType } from "@/components/SessionCard";
import { ProfileCard } from "@/components/ProfileCard";
import { CreateSessionButton } from "@/components/CreateSessionButton";
import { StatsRow } from "@/components/StatsRow";

const mockSessions = [
  {
    sport: "padel" as SportType,
    title: "Morning Padel Match",
    location: "Marina Padel Club",
    time: "Tomorrow 7:00 AM",
    spotsLeft: 2,
    totalSpots: 4,
    skillLevel: "Advanced",
    cryptoFocus: "Founders Only",
    host: { name: "Marcus", role: "VC Partner" },
  },
  {
    sport: "gym" as SportType,
    title: "Power Workout",
    location: "Fitness First DIFC",
    time: "Today 6:00 PM",
    spotsLeft: 5,
    totalSpots: 8,
    skillLevel: "All Levels",
    isLive: true,
    host: { name: "Alex", role: "Founder" },
  },
  {
    sport: "tennis" as SportType,
    title: "Tennis Singles",
    location: "JBR Courts",
    time: "Saturday 9:00 AM",
    spotsLeft: 1,
    totalSpots: 2,
    skillLevel: "Intermediate",
    host: { name: "Sarah", role: "Trader" },
  },
];

const mockProfiles = [
  {
    name: "Viktor K.",
    city: "Dubai",
    role: "Founder",
    mindset: "Builder",
    sports: ["Padel", "Gym", "Golf"],
    isOnline: true,
    reliability: 94,
  },
  {
    name: "Elena M.",
    city: "Dubai",
    role: "Investor",
    mindset: "Strategist",
    sports: ["Tennis", "Running"],
    isOnline: false,
    reliability: 88,
  },
];

const Index = () => {

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-6">
        {/* Stats Overview */}
        <section className="slide-up" style={{ animationDelay: "0.1s" }}>
          <StatsRow />
        </section>

        {/* Live Session Banner */}
        <section className="slide-up" style={{ animationDelay: "0.15s" }}>
          <LiveSessionBanner />
        </section>

        {/* Map Preview */}
        <section className="slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Active Nearby
          </h2>
          <MapPreview />
        </section>

        {/* Quick Filters */}
        <section className="slide-up" style={{ animationDelay: "0.25s" }}>
          <QuickFilters />
        </section>

        {/* Sessions */}
        <section className="slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Upcoming Sessions
            </h2>
            <button className="text-sm text-primary font-medium">See All</button>
          </div>
          <div className="space-y-3">
            {mockSessions.map((session, index) => (
              <SessionCard key={index} {...session} />
            ))}
          </div>
        </section>

        {/* Network */}
        <section className="slide-up" style={{ animationDelay: "0.35s" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              People Near You
            </h2>
            <button className="text-sm text-primary font-medium">See All</button>
          </div>
          <div className="space-y-3">
            {mockProfiles.map((profile, index) => (
              <ProfileCard key={index} {...profile} />
            ))}
          </div>
        </section>
      </main>

      <CreateSessionButton />
      <BottomNav />
    </div>
  );
};

export default Index;
