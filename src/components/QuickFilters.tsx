import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon, YogaIcon, PilatesIcon } from "@/components/icons/SportIcons";
import { DollarSign, Users, Lock, Handshake, Hash } from "lucide-react";

interface FilterItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: "sport" | "intent";
}

const sportFilters: FilterItem[] = [
  { id: "all", icon: ({ className }) => <span className={className}>⚡</span>, label: "All", type: "sport" },
  { id: "padel", icon: PadelIcon, label: "Padel", type: "sport" },
  { id: "tennis", icon: TennisIcon, label: "Tennis", type: "sport" },
  { id: "golf", icon: GolfIcon, label: "Golf", type: "sport" },
  { id: "gym", icon: GymIcon, label: "Gym", type: "sport" },
  { id: "running", icon: RunningIcon, label: "Running", type: "sport" },
  { id: "combat", icon: CombatIcon, label: "Combat", type: "sport" },
  { id: "yoga", icon: YogaIcon, label: "Yoga", type: "sport" },
  { id: "pilates", icon: PilatesIcon, label: "Pilates", type: "sport" },
];

const intentFilters: FilterItem[] = [
  { id: "fundraising", icon: DollarSign, label: "#Fundraising", type: "intent" },
  { id: "hiring", icon: Users, label: "#Hiring", type: "intent" },
  { id: "alpha_only", icon: Lock, label: "#AlphaOnly", type: "intent" },
  { id: "social_networking", icon: Handshake, label: "#Networking", type: "intent" },
];

interface QuickFiltersProps {
  onSportChange?: (sport: string) => void;
  onIntentChange?: (intent: string | null) => void;
  showIntents?: boolean;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  onSportChange,
  onIntentChange,
  showIntents = true,
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIntent, setActiveIntent] = useState<string | null>(null);

  const handleSportClick = (filterId: string) => {
    setActiveFilter(filterId);
    onSportChange?.(filterId);
  };

  const handleIntentClick = (intentId: string) => {
    const newIntent = activeIntent === intentId ? null : intentId;
    setActiveIntent(newIntent);
    onIntentChange?.(newIntent);
  };

  return (
    <div className="space-y-2">
      {/* Sport Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4">
        {sportFilters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          
          return (
            <button
              key={filter.id}
              onClick={() => handleSportClick(filter.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0",
                isActive
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border-gold"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Intent Filters */}
      {showIntents && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2 flex-shrink-0">
            <Hash className="w-3 h-3" />
            <span>Intent:</span>
          </div>
          {intentFilters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeIntent === filter.id;
            
            return (
              <button
                key={filter.id}
                onClick={() => handleIntentClick(filter.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0 text-xs",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <Icon className="w-3 h-3" />
                <span className="font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
