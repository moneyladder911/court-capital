import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { LessonsFeed, Lesson } from "@/components/LessonsFeed";
import { TrendingAlphaSidebar } from "@/components/TrendingAlphaSidebar";
import { QuickFilters } from "@/components/QuickFilters";
import { Lightbulb, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  {
    id: "3",
    lessonText: "Market timing is like tennis timing - you can analyze all you want but eventually you have to commit to the shot.",
    authorName: "James Wilson",
    authorRole: "Trader",
    authorEnergyStyle: "competitive",
    sport: "tennis",
    sessionTitle: "Evening Tennis - VC Meet",
    mood: "inspired",
    upvotesCount: 31,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    lessonText: "Running with other founders is cheaper than therapy and more productive than most meetings. The conversation flows better when you're moving.",
    authorName: "Emma Davis",
    authorRole: "CEO",
    authorEnergyStyle: "social",
    sport: "running",
    mood: "grateful",
    upvotesCount: 42,
    hasUpvoted: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    lessonText: "Yoga taught me that breathing through volatility is a literal skill. 10 minutes of meditation before market open changed my trading.",
    authorName: "David Park",
    authorRole: "Portfolio Manager",
    authorEnergyStyle: "strategic",
    sport: "yoga",
    mood: "focused",
    upvotesCount: 15,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState(mockLessons);
  const [showFilters, setShowFilters] = useState(false);

  const handleUpvote = (id: string) => {
    setLessons(prev => 
      prev.map(lesson => {
        if (lesson.id === id) {
          return {
            ...lesson,
            hasUpvoted: !lesson.hasUpvoted,
            upvotesCount: lesson.hasUpvoted 
              ? lesson.upvotesCount - 1 
              : lesson.upvotesCount + 1,
          };
        }
        return lesson;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-md mx-auto px-4 pb-32 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h1 className="font-display text-2xl font-bold">Lessons</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <section className="mb-6">
            <QuickFilters showIntents={false} />
          </section>
        )}

        {/* Trending Topics */}
        <section className="mb-6">
          <TrendingAlphaSidebar />
        </section>

        {/* Lessons Feed */}
        <LessonsFeed
          lessons={lessons}
          onUpvote={handleUpvote}
          showHeader={false}
        />
      </main>

      <BottomNav />
    </div>
  );
};

export default Lessons;
