import React from "react";
import { LessonCard } from "./LessonCard";
import { Lightbulb } from "lucide-react";
import { EnergyStyle } from "./EnergyBadge";

type PostMood = "energized" | "challenged" | "inspired" | "tired" | "grateful" | "focused";

export interface Lesson {
  id: string;
  lessonText: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  authorEnergyStyle?: EnergyStyle;
  sport?: string;
  sessionTitle?: string;
  mood?: PostMood;
  upvotesCount: number;
  hasUpvoted?: boolean;
  createdAt: string;
}

interface LessonsFeedProps {
  lessons: Lesson[];
  onUpvote?: (id: string) => void;
  compact?: boolean;
  showHeader?: boolean;
  maxItems?: number;
}

export const LessonsFeed: React.FC<LessonsFeedProps> = ({
  lessons,
  onUpvote,
  compact = false,
  showHeader = true,
  maxItems,
}) => {
  const displayLessons = maxItems ? lessons.slice(0, maxItems) : lessons;

  if (lessons.length === 0) {
    return (
      <div className="text-center py-8">
        <Lightbulb className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
        <p className="text-muted-foreground">No lessons shared yet.</p>
        <p className="text-sm text-muted-foreground/70">
          Complete a session to share your first insight.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {showHeader && (
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-lg">Community Lessons</h3>
        </div>
      )}

      {displayLessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          {...lesson}
          onUpvote={onUpvote}
          compact={compact}
        />
      ))}
    </div>
  );
};
