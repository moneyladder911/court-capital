import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChevronRight } from "lucide-react";

export const LiveSessionBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border-gold bg-gradient-to-r from-card via-card to-primary/10">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="live" className="text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-live mr-1" />
                HAPPENING NOW
              </Badge>
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">
              Crypto Founders Padel
            </h3>
            <p className="text-sm text-muted-foreground">Dubai Marina Courts</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              2 spots
            </span>
            <span className="flex items-center gap-1 text-sm text-primary">
              <Clock className="w-4 h-4" />
              Starts in 15m
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-gold border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center text-xs text-muted-foreground">
              +2
            </div>
          </div>
          
          <Button variant="gold" size="sm" className="gap-1">
            Join Now
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
