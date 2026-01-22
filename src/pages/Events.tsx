import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Tent,
  Coffee,
  Crown,
  Clock,
  Plus,
} from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon } from "@/components/icons/SportIcons";

interface Event {
  id: string;
  title: string;
  description: string;
  type: "tournament" | "meetup" | "retreat" | "camp" | "casual";
  sport: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees?: number;
  isVIP: boolean;
  price?: number;
  imageUrl?: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Dubai Crypto Padel Championship",
    description: "The ultimate padel tournament for Web3 founders and investors",
    type: "tournament",
    sport: "padel",
    location: "Marina Padel Club, Dubai",
    date: "Feb 15, 2025",
    time: "9:00 AM",
    attendees: 24,
    maxAttendees: 32,
    isVIP: true,
    price: 150,
  },
  {
    id: "2",
    title: "Founders Fitness Camp",
    description: "3-day intensive training camp for crypto entrepreneurs",
    type: "camp",
    sport: "gym",
    location: "Bali, Indonesia",
    date: "Mar 1-3, 2025",
    time: "All Day",
    attendees: 18,
    maxAttendees: 25,
    isVIP: true,
    price: 500,
  },
  {
    id: "3",
    title: "Golf & Networking Day",
    description: "Premium golf experience with VC partners and founders",
    type: "meetup",
    sport: "golf",
    location: "Emirates Golf Club",
    date: "Feb 20, 2025",
    time: "7:00 AM",
    attendees: 12,
    maxAttendees: 16,
    isVIP: false,
  },
  {
    id: "4",
    title: "Morning Run Club",
    description: "Weekly morning run for crypto traders and builders",
    type: "casual",
    sport: "running",
    location: "JBR Beach, Dubai",
    date: "Every Saturday",
    time: "6:00 AM",
    attendees: 45,
    isVIP: false,
  },
  {
    id: "5",
    title: "Web3 Boxing Bootcamp",
    description: "High-intensity boxing training for competitive minds",
    type: "camp",
    sport: "combat",
    location: "Fight Academy Dubai",
    date: "Feb 25, 2025",
    time: "6:00 PM",
    attendees: 8,
    maxAttendees: 12,
    isVIP: false,
    price: 75,
  },
];

const getTypeIcon = (type: Event["type"]) => {
  switch (type) {
    case "tournament":
      return <Trophy className="w-4 h-4" />;
    case "retreat":
      return <Tent className="w-4 h-4" />;
    case "camp":
      return <Tent className="w-4 h-4" />;
    case "casual":
      return <Coffee className="w-4 h-4" />;
    default:
      return <Users className="w-4 h-4" />;
  }
};

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
      return null;
  }
};

const Events = () => {
  const [filter, setFilter] = useState<"all" | "tournament" | "meetup" | "camp">("all");

  const filteredEvents = filter === "all" 
    ? mockEvents 
    : mockEvents.filter((e) => e.type === filter);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground">Events</h1>
          <Button variant="gold" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Create
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["all", "tournament", "meetup", "camp"].map((f) => (
            <button
              key={f}
              className={`py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
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

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`glass-card rounded-xl overflow-hidden card-hover ${
                event.isVIP ? "border border-border-gold" : ""
              }`}
            >
              {/* Event Header */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {event.isVIP && (
                        <Crown className="w-4 h-4 text-primary" />
                      )}
                      <Badge variant={event.isVIP ? "gold" : "muted"}>
                        {getTypeIcon(event.type)}
                        <span className="ml-1 capitalize">{event.type}</span>
                      </Badge>
                    </div>
                    <h3 className="font-display font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-background">
                    {getSportIcon(event.sport)}
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate max-w-[150px]">{event.location}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(3, event.attendees))].map((_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-gradient-card border-2 border-background flex items-center justify-center"
                        >
                          <span className="text-xs font-bold text-primary">
                            {String.fromCharCode(65 + i)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {event.attendees}
                      {event.maxAttendees && `/${event.maxAttendees}`} going
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.price && (
                      <span className="text-sm font-medium text-primary">
                        ${event.price}
                      </span>
                    )}
                    <Button variant={event.isVIP ? "gold" : "gold-outline"} size="sm">
                      RSVP
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav activeTab="events" onTabChange={() => {}} />
    </div>
  );
};

export default Events;
