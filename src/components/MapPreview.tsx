import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";

interface ActiveUser {
  id: string;
  position: { x: number; y: number };
  sport: string;
  isLive?: boolean;
}

export const MapPreview: React.FC = () => {
  // Simulated active users on map
  const activeUsers: ActiveUser[] = [
    { id: "1", position: { x: 25, y: 30 }, sport: "Padel", isLive: true },
    { id: "2", position: { x: 60, y: 45 }, sport: "Gym" },
    { id: "3", position: { x: 45, y: 65 }, sport: "Tennis" },
    { id: "4", position: { x: 75, y: 25 }, sport: "Golf", isLive: true },
    { id: "5", position: { x: 35, y: 55 }, sport: "Running" },
  ];

  return (
    <div className="relative rounded-xl overflow-hidden glass-card">
      {/* Map Background */}
      <div className="relative h-48 bg-gradient-to-br from-card to-background">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Active Users Markers */}
        {activeUsers.map((user) => (
          <div
            key={user.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${user.position.x}%`, top: `${user.position.y}%` }}
          >
            <div className={`relative ${user.isLive ? 'animate-float' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                user.isLive 
                  ? 'bg-gradient-gold shadow-gold' 
                  : 'bg-card border border-border'
              }`}>
                <MapPin className={`w-4 h-4 ${user.isLive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
              </div>
              {user.isLive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-live live-pulse" />
              )}
            </div>
          </div>
        ))}

        {/* Location Label */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Dubai Marina</span>
          </div>
          <Badge variant="gold-outline" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>12 Active</span>
          </Badge>
        </div>
      </div>

      {/* Tap hint */}
      <div className="px-4 py-2.5 border-t border-border flex items-center justify-center">
        <span className="text-xs text-muted-foreground">Tap to expand map</span>
      </div>
    </div>
  );
};
