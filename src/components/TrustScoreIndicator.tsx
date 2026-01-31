import React from "react";
import { cn } from "@/lib/utils";

interface TrustScoreIndicatorProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const TrustScoreIndicator: React.FC<TrustScoreIndicatorProps> = ({
  score,
  size = "md",
  showLabel = true,
  className,
}) => {
  const clampedScore = Math.max(0, Math.min(100, score));
  
  const sizeClasses = {
    sm: { container: "w-12 h-12", text: "text-xs", strokeWidth: 3 },
    md: { container: "w-16 h-16", text: "text-sm", strokeWidth: 4 },
    lg: { container: "w-24 h-24", text: "text-lg", strokeWidth: 5 },
  };

  const { container, text, strokeWidth } = sizeClasses[size];
  
  // Calculate circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  // Color based on score
  const getScoreColor = () => {
    if (clampedScore >= 80) return "stroke-success";
    if (clampedScore >= 60) return "stroke-primary";
    if (clampedScore >= 40) return "stroke-accent";
    return "stroke-muted-foreground";
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className={cn("relative", container)}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            className="stroke-border"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            className={cn(getScoreColor(), "transition-all duration-700 ease-out")}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold text-foreground", text)}>
            {clampedScore}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground font-medium">
          Trust Score
        </span>
      )}
    </div>
  );
};
