import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-border">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => navigate("/")} 
          className="text-left focus:outline-none"
        >
          <h1 className="font-display text-xl font-bold">
            <span className="gold-text">CHAIN</span>
            <span className="text-foreground">PLAY</span>
          </h1>
          <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
            Build Deals. Build Bodies.
          </p>
        </button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-live" />
          </Button>
        </div>
      </div>
    </header>
  );
};
