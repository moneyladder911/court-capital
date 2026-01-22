import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  MapPin,
  Lock,
  Plus,
  ChevronRight,
  Crown,
} from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon } from "@/components/icons/SportIcons";

interface Group {
  id: string;
  name: string;
  description: string;
  city: string;
  sport: string;
  members: number;
  isPrivate: boolean;
  isJoined: boolean;
  imageUrl?: string;
}

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Dubai Crypto Padel",
    description: "The original Web3 padel community in Dubai",
    city: "Dubai",
    sport: "padel",
    members: 156,
    isPrivate: false,
    isJoined: true,
  },
  {
    id: "2",
    name: "Miami Web3 Tennis",
    description: "Competitive tennis for crypto professionals",
    city: "Miami",
    sport: "tennis",
    members: 89,
    isPrivate: false,
    isJoined: true,
  },
  {
    id: "3",
    name: "Founders Golf Club",
    description: "Exclusive golf networking for founders and VCs",
    city: "Global",
    sport: "golf",
    members: 45,
    isPrivate: true,
    isJoined: false,
  },
  {
    id: "4",
    name: "Lisbon Builders Running",
    description: "Morning runs for Web3 builders in Lisbon",
    city: "Lisbon",
    sport: "running",
    members: 67,
    isPrivate: false,
    isJoined: false,
  },
  {
    id: "5",
    name: "Singapore Combat Elite",
    description: "MMA, boxing, and BJJ for crypto traders",
    city: "Singapore",
    sport: "combat",
    members: 34,
    isPrivate: true,
    isJoined: false,
  },
  {
    id: "6",
    name: "Bali Fitness Founders",
    description: "Gym sessions and wellness for digital nomads",
    city: "Bali",
    sport: "gym",
    members: 112,
    isPrivate: false,
    isJoined: false,
  },
];

const getSportIcon = (sport: string) => {
  switch (sport) {
    case "padel":
      return <PadelIcon className="w-5 h-5" />;
    case "tennis":
      return <TennisIcon className="w-5 h-5" />;
    case "golf":
      return <GolfIcon className="w-5 h-5" />;
    case "gym":
      return <GymIcon className="w-5 h-5" />;
    case "running":
      return <RunningIcon className="w-5 h-5" />;
    case "combat":
      return <CombatIcon className="w-5 h-5" />;
    default:
      return <Users className="w-5 h-5" />;
  }
};

const Groups = () => {
  const [filter, setFilter] = useState<"all" | "joined" | "discover">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = mockGroups
    .filter((g) => {
      if (filter === "joined") return g.isJoined;
      if (filter === "discover") return !g.isJoined;
      return true;
    })
    .filter((g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">Communities</h1>
          <Button variant="gold" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Create
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search communities..."
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {["all", "joined", "discover"].map((f) => (
            <button
              key={f}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
              onClick={() => setFilter(f as typeof filter)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* My Groups */}
        {filter !== "discover" && (
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Your Communities
            </h2>
            {filteredGroups
              .filter((g) => g.isJoined)
              .map((group) => (
                <div
                  key={group.id}
                  className="glass-card rounded-xl p-4 card-hover border border-border-gold"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center text-background">
                      {getSportIcon(group.sport)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-medium text-foreground truncate">
                          {group.name}
                        </h3>
                        {group.isPrivate && (
                          <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{group.city}</span>
                        <span className="text-border">•</span>
                        <Users className="w-3.5 h-3.5" />
                        <span>{group.members}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Discover Groups */}
        {filter !== "joined" && (
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Discover
            </h2>
            {filteredGroups
              .filter((g) => !g.isJoined)
              .map((group) => (
                <div
                  key={group.id}
                  className="glass-card rounded-xl p-4 card-hover"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-card border border-border flex items-center justify-center text-primary">
                      {getSportIcon(group.sport)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-medium text-foreground truncate">
                          {group.name}
                        </h3>
                        {group.isPrivate && (
                          <Badge variant="muted" className="text-xs">
                            <Lock className="w-3 h-3 mr-0.5" />
                            Private
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {group.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{group.city}</span>
                        <span className="text-border">•</span>
                        <Users className="w-3 h-3" />
                        <span>{group.members} members</span>
                      </div>
                    </div>
                    <Button
                      variant={group.isPrivate ? "outline" : "gold"}
                      size="sm"
                    >
                      {group.isPrivate ? "Request" : "Join"}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No communities found</p>
          </div>
        )}
      </main>

      <BottomNav activeTab="network" onTabChange={() => {}} />
    </div>
  );
};

export default Groups;
