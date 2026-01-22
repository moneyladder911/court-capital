import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Users } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  isGroup?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Marcus K.",
    lastMessage: "See you at the padel court tomorrow! 🎾",
    time: "2m",
    unread: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Dubai Crypto Padel",
    lastMessage: "Alex: Great session everyone!",
    time: "15m",
    unread: 5,
    isOnline: false,
    isGroup: true,
  },
  {
    id: "3",
    name: "Sarah T.",
    lastMessage: "Looking forward to the tennis match",
    time: "1h",
    unread: 0,
    isOnline: true,
  },
  {
    id: "4",
    name: "Viktor M.",
    lastMessage: "Thanks for the gym tips 💪",
    time: "3h",
    unread: 0,
    isOnline: false,
  },
  {
    id: "5",
    name: "Miami Web3 Tennis",
    lastMessage: "Elena: Tournament starts at 9am",
    time: "1d",
    unread: 0,
    isOnline: false,
    isGroup: true,
  },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Search conversations..."
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === "messages"
                ? "bg-primary text-primary-foreground"
                : "glass-card text-muted-foreground"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Direct
          </button>
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === "groups"
                ? "bg-primary text-primary-foreground"
                : "glass-card text-muted-foreground"
            }`}
            onClick={() => setActiveTab("groups")}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Groups
          </button>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filteredConversations
            .filter((c) =>
              activeTab === "groups" ? c.isGroup : !c.isGroup
            )
            .map((conversation) => (
              <div
                key={conversation.id}
                className="glass-card rounded-xl p-4 card-hover cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center">
                      {conversation.isGroup ? (
                        <Users className="w-5 h-5 text-primary" />
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          {conversation.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    {conversation.isOnline && !conversation.isGroup && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-background" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-medium text-foreground truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {conversation.unread > 0 && (
                    <Badge variant="gold" className="text-xs min-w-[20px] justify-center">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
        </div>

        {filteredConversations.filter((c) =>
          activeTab === "groups" ? c.isGroup : !c.isGroup
        ).length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No conversations yet</p>
          </div>
        )}
      </main>

      <BottomNav activeTab="messages" onTabChange={() => {}} />
    </div>
  );
};

export default Messages;
