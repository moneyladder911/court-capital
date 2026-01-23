import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon, YogaIcon, PilatesIcon } from "@/components/icons/SportIcons";

interface FilterItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const filters: FilterItem[] = [
  { id: "all", icon: ({ className }) => <span className={className}>⚡</span>, label: "All" },
  { id: "padel", icon: PadelIcon, label: "Padel" },
  { id: "tennis", icon: TennisIcon, label: "Tennis" },
  { id: "golf", icon: GolfIcon, label: "Golf" },
  { id: "gym", icon: GymIcon, label: "Gym" },
  { id: "running", icon: RunningIcon, label: "Running" },
  { id: "combat", icon: CombatIcon, label: "Combat" },
  { id: "yoga", icon: YogaIcon, label: "Yoga" },
  { id: "pilates", icon: PilatesIcon, label: "Pilates" },
];

export const QuickFilters: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
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
  );
};
