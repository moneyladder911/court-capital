import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { LessonsFeed, Lesson } from "@/components/LessonsFeed";
import { TrendingAlphaSidebar } from "@/components/TrendingAlphaSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Clock, Lightbulb } from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon } from "@/components/icons/SportIcons";
import { cn } from "@/lib/utils";

const sportFilters = [
  { id: "all", label: "All", icon: null },
  { id: "padel", label: "Padel", icon: PadelIcon },
  { id: "tennis", label: "Tennis", icon: TennisIcon },
  { id: "golf", label: "Golf", icon: GolfIcon },
  { id: "gym", label: "Gym", icon: GymIcon },
  { id: "running", label: "Running", icon: RunningIcon },
  { id: "combat", label: "Combat", icon: CombatIcon },
];

// Mock data for demonstration
const mockLessons: Lesson[] = [
  {
    id: "1",
    lessonText: "The best networking happens when you're not trying to network. Just focus on the game and connections follow naturally.",
    authorName: "Marcus W.",
    authorRole: "VC Partner",
    authorEnergyStyle: "strategic",
    sport: "padel",
    sessionTitle: "Morning Padel Match",
    mood: "inspired",
    upvotesCount: 24,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    lessonText: "Showing up consistently matters more than showing up perfectly. Your reputation is built one session at a time.",
    authorName: "Elena M.",
    authorRole: "Investor",
    authorEnergyStyle: "competitive",
    sport: "tennis",
    sessionTitle: "Tennis Singles",
    mood: "energized",
    upvotesCount: 18,
    hasUpvoted: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    lessonText: "Early morning sessions filter for serious people. If someone is willing to wake up at 6 AM to play, they're committed.",
    authorName: "James W.",
    authorRole: "Trader",
    authorEnergyStyle: "social",
    sport: "gym",
    sessionTitle: "Power Workout",
    mood: "focused",
    upvotesCount: 12,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    lessonText: "The warmup conversation often reveals more about deal compatibility than any formal meeting ever would.",
    authorName: "Sarah K.",
    authorRole: "Founder",
    authorEnergyStyle: "strategic",
    sport: "padel",
    sessionTitle: "Founders Only Padel",
    mood: "grateful",
    upvotesCount: 31,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    lessonText: "Lost every game today but gained three amazing connections. Sometimes losing is the best thing that can happen.",
    authorName: "Viktor K.",
    authorRole: "Dev",
    authorEnergyStyle: "social",
    sport: "tennis",
    sessionTitle: "Casual Tennis",
    mood: "challenged",
    upvotesCount: 15,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [activeTab, setActiveTab] = useState<"top" | "recent">("top");
  const [activeSport, setActiveSport] = useState("all");

  const handleUpvote = (id: string) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id
          ? {
              ...lesson,
              hasUpvoted: !lesson.hasUpvoted,
              upvotesCount: lesson.hasUpvoted
                ? lesson.upvotesCount - 1
                : lesson.upvotesCount + 1,
            }
          : lesson
      )
    );
  };

  const filteredLessons = lessons.filter(
    (lesson) => activeSport === "all" || lesson.sport === activeSport
  );

  const sortedLessons = [...filteredLessons].sort((a, b) => {
    if (activeTab === "top") {
      return b.upvotesCount - a.upvotesCount;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Community Lessons</h1>
            <p className="text-sm text-muted-foreground">
              Wisdom from the network
            </p>
          </div>
        </div>

        {/* Sport Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4">
          {sportFilters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeSport === filter.id;
            
            return (
              <button
                key={filter.id}
                onClick={() => setActiveSport(filter.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0 text-xs",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {Icon && <Icon className="w-3 h-3" />}
                <span className="font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Trending Alpha Sidebar */}
        <TrendingAlphaSidebar 
          onTagClick={(tag) => console.log("Filter by:", tag)} 
        />

        {/* Tabs for sorting */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "top" | "recent")}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="top" className="gap-2">
              <Flame className="w-4 h-4" />
              Top
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2">
              <Clock className="w-4 h-4" />
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top" className="mt-4">
            <LessonsFeed
              lessons={sortedLessons}
              onUpvote={handleUpvote}
              showHeader={false}
            />
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <LessonsFeed
              lessons={sortedLessons}
              onUpvote={handleUpvote}
              showHeader={false}
            />
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Lessons;
