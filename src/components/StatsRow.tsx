import React from "react";
import { TrendingUp, Users, Calendar, Trophy } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const StatsRow: React.FC = () => {
  const stats: StatItem[] = [
    { icon: <Users className="w-4 h-4" />, value: "2.4K", label: "Network" },
    { icon: <Calendar className="w-4 h-4" />, value: "47", label: "Sessions" },
    { icon: <Trophy className="w-4 h-4" />, value: "12", label: "Events" },
    { icon: <TrendingUp className="w-4 h-4" />, value: "89%", label: "Rating" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-card rounded-xl p-3 flex flex-col items-center justify-center text-center"
        >
          <div className="text-primary mb-1">{stat.icon}</div>
          <span className="font-display font-bold text-foreground">{stat.value}</span>
          <span className="text-[10px] text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};
