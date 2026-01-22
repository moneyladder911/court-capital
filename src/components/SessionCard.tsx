import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock } from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon } from "@/components/icons/SportIcons";

export type SportType = "padel" | "tennis" | "golf" | "gym" | "running" | "combat";

interface SessionCardProps {
  sport: SportType;
  title: string;
  location: string;
  time: string;
  spotsLeft: number;
  totalSpots: number;
  skillLevel: string;
  isLive?: boolean;
  cryptoFocus?: string;
  host: {
    name: string;
    role: string;
    avatar?: string;
  };
}

const sportIcons: Record<SportType, React.ComponentType<{ className?: string }>> = {
  padel: PadelIcon,
  tennis: TennisIcon,
  golf: GolfIcon,
  gym: GymIcon,
  running: RunningIcon,
  combat: CombatIcon,
};

const sportColors: Record<SportType, string> = {
  padel: "from-amber-500 to-orange-600",
  tennis: "from-green-500 to-emerald-600",
  golf: "from-blue-500 to-cyan-600",
  gym: "from-red-500 to-rose-600",
  running: "from-purple-500 to-violet-600",
  combat: "from-slate-500 to-zinc-600",
};

export const SessionCard: React.FC<SessionCardProps> = ({
  sport,
  title,
  location,
  time,
  spotsLeft,
  totalSpots,
  skillLevel,
  isLive,
  cryptoFocus,
  host,
}) => {
  const SportIcon = sportIcons[sport];

  return (
    <div className="glass-card rounded-xl p-4 card-hover fade-in">
      <div className="flex items-start gap-4">
        {/* Sport Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sportColors[sport]} flex items-center justify-center flex-shrink-0`}>
          <SportIcon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-foreground truncate">{title}</h3>
            {isLive && (
              <Badge variant="live" className="flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-live mr-1.5" />
                LIVE
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {time}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="muted">{skillLevel}</Badge>
            {cryptoFocus && <Badge variant="gold-outline">{cryptoFocus}</Badge>}
          </div>

          {/* Host & Spots */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center text-xs font-bold text-primary-foreground">
                {host.name.charAt(0)}
              </div>
              <div className="text-xs">
                <span className="text-foreground">{host.name}</span>
                <span className="text-muted-foreground"> · {host.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                {spotsLeft}/{totalSpots}
              </span>
              <Button size="sm" variant="gold" className="h-8">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
