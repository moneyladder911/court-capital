import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, Hash } from "lucide-react";

interface TrendingTag {
  tag: string;
  count: number;
  trend: "up" | "stable" | "down";
}

interface TrendingAlphaSidebarProps {
  tags?: TrendingTag[];
  className?: string;
  onTagClick?: (tag: string) => void;
}

// Mock trending data - in production this would come from the database
const defaultTrendingTags: TrendingTag[] = [
  { tag: "DeFi", count: 24, trend: "up" },
  { tag: "AI", count: 18, trend: "up" },
  { tag: "Layer2", count: 15, trend: "stable" },
  { tag: "NFTs", count: 12, trend: "down" },
  { tag: "RWA", count: 10, trend: "up" },
  { tag: "Gaming", count: 8, trend: "stable" },
];

export const TrendingAlphaSidebar: React.FC<TrendingAlphaSidebarProps> = ({
  tags = defaultTrendingTags,
  className,
  onTagClick,
}) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 border border-border",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-foreground">
          Trending Alpha
        </h3>
      </div>

      {/* Subtitle */}
      <p className="text-xs text-muted-foreground mb-4">
        Popular crypto topics from the last 7 days
      </p>

      {/* Tags list */}
      <div className="space-y-2">
        {tags.map((item, index) => (
          <button
            key={item.tag}
            onClick={() => onTagClick?.(item.tag)}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-card/50 transition-colors group"
          >
            <span className="text-xs text-muted-foreground w-4">
              {index + 1}
            </span>
            <div className="flex items-center gap-1 flex-1">
              <Hash className="w-3 h-3 text-primary" />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {item.tag}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {item.count} lessons
              </span>
              {item.trend === "up" && (
                <TrendingUp className="w-3 h-3 text-success" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* View all link */}
      <button className="w-full mt-4 text-sm text-primary font-medium hover:underline">
        View all topics →
      </button>
    </div>
  );
};
