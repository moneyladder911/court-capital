import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronUp, Lightbulb, Zap, Brain, Heart, Coffee, Target, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnergyBadge, EnergyStyle } from "./EnergyBadge";
import { formatDistanceToNow } from "date-fns";

type PostMood = "energized" | "challenged" | "inspired" | "tired" | "grateful" | "focused";

interface LessonCardProps {
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
  onUpvote?: (id: string) => void;
  compact?: boolean;
}

const MOOD_ICONS: Record<PostMood, React.ReactNode> = {
  energized: <Zap className="w-3.5 h-3.5" />,
  challenged: <Target className="w-3.5 h-3.5" />,
  inspired: <Sparkles className="w-3.5 h-3.5" />,
  tired: <Coffee className="w-3.5 h-3.5" />,
  grateful: <Heart className="w-3.5 h-3.5" />,
  focused: <Brain className="w-3.5 h-3.5" />,
};

const MOOD_COLORS: Record<PostMood, string> = {
  energized: "text-yellow-500",
  challenged: "text-orange-500",
  inspired: "text-purple-500",
  tired: "text-muted-foreground",
  grateful: "text-pink-500",
  focused: "text-blue-500",
};

export const LessonCard: React.FC<LessonCardProps> = ({
  id,
  lessonText,
  authorName,
  authorAvatar,
  authorRole,
  authorEnergyStyle,
  sport,
  sessionTitle,
  mood,
  upvotesCount,
  hasUpvoted = false,
  createdAt,
  onUpvote,
  compact = false,
}) => {
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <Card className={cn(
      "border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30",
      compact ? "p-3" : "p-4"
    )}>
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className={cn(compact ? "w-8 h-8" : "w-10 h-10")}>
            <AvatarImage src={authorAvatar} alt={authorName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">{authorName}</span>
              {authorRole && (
                <span className="text-xs text-muted-foreground">• {authorRole}</span>
              )}
              {authorEnergyStyle && <EnergyBadge energy={authorEnergyStyle} size="sm" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {sport && <span className="capitalize">{sport}</span>}
              {sessionTitle && (
                <>
                  <span>•</span>
                  <span className="truncate">{sessionTitle}</span>
                </>
              )}
            </div>
          </div>

          {/* Mood indicator */}
          {mood && (
            <div className={cn("flex items-center gap-1", MOOD_COLORS[mood])}>
              {MOOD_ICONS[mood]}
            </div>
          )}
        </div>

        {/* Lesson content */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <p className={cn(
            "text-foreground leading-relaxed flex-1",
            compact ? "text-sm" : "text-base"
          )}>
            {lessonText}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">{timeAgo}</span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpvote?.(id)}
            className={cn(
              "h-8 px-2 gap-1.5 transition-colors",
              hasUpvoted ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <ChevronUp className={cn("w-4 h-4", hasUpvoted && "fill-primary")} />
            <span className="text-sm font-medium">{upvotesCount}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
