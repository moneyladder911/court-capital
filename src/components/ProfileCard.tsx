import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Zap } from "lucide-react";

interface ProfileCardProps {
  name: string;
  city: string;
  role: string;
  mindset: string;
  sports: string[];
  avatar?: string;
  isOnline?: boolean;
  reliability: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  city,
  role,
  mindset,
  sports,
  avatar,
  isOnline,
  reliability,
}) => {
  return (
    <div className="glass-card rounded-xl p-4 card-hover fade-in">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-xl bg-gradient-card border border-border overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-gold flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {isOnline && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-background" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-foreground">{name}</h3>
            <Badge variant="role">{role}</Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city}</span>
            <span className="text-border">•</span>
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary">{mindset}</span>
          </div>

          {/* Sports */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {sports.map((sport) => (
              <Badge key={sport} variant="muted" className="text-xs">
                {sport}
              </Badge>
            ))}
          </div>

          {/* Reliability & Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Reliability</span>
              <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-gold rounded-full"
                  style={{ width: `${reliability}%` }}
                />
              </div>
              <span className="text-xs font-medium text-primary">{reliability}%</span>
            </div>
            <Button size="sm" variant="gold-outline" className="h-8">
              Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
