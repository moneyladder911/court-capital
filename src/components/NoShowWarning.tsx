import React from "react";
import { AlertTriangle, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NoShowWarningProps {
  noShowCount: number;
  attendanceRate?: number;
  size?: "sm" | "md";
  showDetails?: boolean;
}

export const NoShowWarning: React.FC<NoShowWarningProps> = ({
  noShowCount,
  attendanceRate,
  size = "sm",
  showDetails = false,
}) => {
  // Don't show anything for reliable users
  if (noShowCount === 0 || (attendanceRate && attendanceRate >= 80)) {
    return null;
  }

  const severity =
    noShowCount >= 5 || (attendanceRate && attendanceRate < 50)
      ? "high"
      : noShowCount >= 3 || (attendanceRate && attendanceRate < 70)
        ? "medium"
        : "low";

  const severityStyles = {
    high: "bg-destructive/10 text-destructive border-destructive/30",
    medium: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    low: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  };

  const warningBadge = (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 ${severityStyles[severity]} ${
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      }`}
    >
      <AlertTriangle className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {size === "md" && (
        <span>
          {severity === "high"
            ? "Unreliable"
            : severity === "medium"
              ? "Caution"
              : "Watch"}
        </span>
      )}
      {showDetails && (
        <span className="ml-1">
          {noShowCount} no-show{noShowCount > 1 ? "s" : ""}
        </span>
      )}
    </Badge>
  );

  if (showDetails) {
    return warningBadge;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{warningBadge}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="font-medium">Reliability Warning</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This member has <strong>{noShowCount}</strong> no-show
            {noShowCount > 1 ? "s" : ""} on record.
            {attendanceRate && (
              <>
                {" "}
                Current attendance rate:{" "}
                <strong className="text-destructive">{attendanceRate}%</strong>
              </>
            )}
          </p>
          {severity === "high" && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Consider this when joining their sessions
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
