import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  UserPlus,
  UserCheck,
  Clock,
  Star,
  MapPin,
  Zap,
  Check,
  X,
} from "lucide-react";

interface ConnectionRequest {
  id: string;
  name: string;
  role: string;
  city: string;
  mindset: string;
  sports: string[];
  reliability: number;
  isOnline: boolean;
  message?: string;
}

const mockPending: ConnectionRequest[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Founder",
    city: "Dubai",
    mindset: "Builder",
    sports: ["Padel", "Golf"],
    reliability: 92,
    isOnline: true,
    message: "Would love to connect for padel sessions!",
  },
  {
    id: "2",
    name: "Maria S.",
    role: "VC",
    city: "Miami",
    mindset: "Investor",
    sports: ["Tennis"],
    reliability: 88,
    isOnline: false,
    message: "Great session yesterday!",
  },
];

const mockConnections: ConnectionRequest[] = [
  {
    id: "3",
    name: "Viktor K.",
    role: "Founder",
    city: "Dubai",
    mindset: "Builder",
    sports: ["Padel", "Gym", "Golf"],
    reliability: 94,
    isOnline: true,
  },
  {
    id: "4",
    name: "Elena M.",
    role: "Investor",
    city: "Dubai",
    mindset: "Strategist",
    sports: ["Tennis", "Running"],
    reliability: 88,
    isOnline: false,
  },
  {
    id: "5",
    name: "James W.",
    role: "Trader",
    city: "Singapore",
    mindset: "Competitor",
    sports: ["Combat", "Gym"],
    reliability: 96,
    isOnline: true,
  },
];

const Connections = () => {
  const [activeTab, setActiveTab] = useState<"connections" | "pending" | "suggestions">("connections");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search connections..."
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === "connections"
                ? "bg-primary text-primary-foreground"
                : "glass-card text-muted-foreground"
            }`}
            onClick={() => setActiveTab("connections")}
          >
            <UserCheck className="w-4 h-4" />
            My Network
            <Badge variant="muted" className="ml-1">{mockConnections.length}</Badge>
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === "pending"
                ? "bg-primary text-primary-foreground"
                : "glass-card text-muted-foreground"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            <Clock className="w-4 h-4" />
            Pending
            {mockPending.length > 0 && (
              <Badge variant="gold" className="ml-1">{mockPending.length}</Badge>
            )}
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === "suggestions"
                ? "bg-primary text-primary-foreground"
                : "glass-card text-muted-foreground"
            }`}
            onClick={() => setActiveTab("suggestions")}
          >
            <Star className="w-4 h-4" />
            Suggested
          </button>
        </div>

        {/* Pending Requests */}
        {activeTab === "pending" && (
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Connection Requests
            </h2>
            {mockPending.map((request) => (
              <div key={request.id} className="glass-card rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-foreground">
                        {request.name.charAt(0)}
                      </span>
                    </div>
                    {request.isOnline && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-success border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{request.name}</h3>
                      <Badge variant="role">{request.role}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{request.city}</span>
                      <span className="text-border">•</span>
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      <span className="text-primary">{request.mindset}</span>
                    </div>
                  </div>
                </div>

                {request.message && (
                  <p className="text-sm text-muted-foreground bg-card/50 rounded-lg p-3 italic">
                    "{request.message}"
                  </p>
                )}

                <div className="flex gap-2">
                  <Button variant="gold" size="sm" className="flex-1">
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <X className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connections */}
        {activeTab === "connections" && (
          <div className="space-y-3">
            {mockConnections.map((connection) => (
              <div key={connection.id} className="glass-card rounded-xl p-4 card-hover">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-card border border-border flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {connection.name.charAt(0)}
                      </span>
                    </div>
                    {connection.isOnline && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-success border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{connection.name}</h3>
                      <Badge variant="role">{connection.role}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{connection.city}</span>
                      <span className="text-border">•</span>
                      <span className="text-primary">{connection.reliability}%</span>
                    </div>
                  </div>
                  <Button variant="gold-outline" size="sm">
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {activeTab === "suggestions" && (
          <div className="space-y-3">
            <div className="glass-card rounded-xl p-4 border border-border-gold">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Smart Matches
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your sports, skill level, and crypto role
              </p>
              {mockConnections.slice(0, 2).map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center gap-3 py-3 border-t border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <span className="font-bold text-primary-foreground">
                      {suggestion.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">
                      {suggestion.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {suggestion.sports.join(", ")}
                    </p>
                  </div>
                  <Button variant="gold" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Connections;
