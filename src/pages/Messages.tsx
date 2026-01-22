import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ChatView } from "@/components/ChatView";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Users, Bell, BellOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useConversations, ConversationWithDetails } from "@/hooks/useConversations";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

const Messages = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { conversations, loading } = useConversations(user?.id);
  const { isSupported, permission, requestPermission } = useNotifications();
  const [activeTab, setActiveTab] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    otherUserName: string;
    otherUserAvatar?: string | null;
    isOnline?: boolean;
  } | null>(null);

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) => {
    const otherParticipant = conv.participants.find((p) => p.user_id !== user?.id);
    const name = otherParticipant?.profile?.name || "Unknown";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getConversationDisplay = (conv: ConversationWithDetails) => {
    const otherParticipant = conv.participants.find((p) => p.user_id !== user?.id);
    const name = otherParticipant?.profile?.name || "Unknown User";
    const avatar = otherParticipant?.profile?.avatar_url;
    const isOnline = otherParticipant?.profile?.is_online || false;

    return { name, avatar, isOnline };
  };

  const formatTime = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { addSuffix: false })
        .replace("about ", "")
        .replace(" minutes", "m")
        .replace(" minute", "m")
        .replace(" hours", "h")
        .replace(" hour", "h")
        .replace(" days", "d")
        .replace(" day", "d")
        .replace("less than a minute", "now");
    } catch {
      return "";
    }
  };

  const handleConversationClick = (conv: ConversationWithDetails) => {
    const display = getConversationDisplay(conv);
    setSelectedConversation({
      id: conv.id,
      otherUserName: display.name,
      otherUserAvatar: display.avatar,
      isOnline: display.isOnline,
    });
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header />
        <main className="max-w-md mx-auto px-4 py-12 text-center">
          <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Sign in to message</h2>
          <p className="text-muted-foreground mb-6">
            Connect with other players and start conversations
          </p>
          <Button variant="gold" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  // Show chat view if conversation is selected
  if (selectedConversation && user) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header />
        <main className="max-w-md mx-auto px-4 py-4">
          <ChatView
            conversationId={selectedConversation.id}
            userId={user.id}
            otherUserName={selectedConversation.otherUserName}
            otherUserAvatar={selectedConversation.otherUserAvatar}
            isOnline={selectedConversation.isOnline}
            onBack={() => setSelectedConversation(null)}
          />
        </main>
        <BottomNav />
      </div>
    );
  }

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

        {/* Notification Permission Banner */}
        {isSupported && permission === "default" && (
          <div className="glass-card rounded-xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Enable notifications for new messages
              </span>
            </div>
            <Button size="sm" variant="gold" onClick={requestPermission}>
              Enable
            </Button>
          </div>
        )}
        
        {isSupported && permission === "denied" && (
          <div className="glass-card rounded-xl p-3 flex items-center gap-2 opacity-60">
            <BellOff className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Notifications blocked - enable in browser settings
            </span>
          </div>
        )}

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

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <>
            {/* Conversations List */}
            <div className="space-y-2">
              {filteredConversations.map((conv) => {
                const display = getConversationDisplay(conv);
                return (
                  <div
                    key={conv.id}
                    className="glass-card rounded-xl p-4 card-hover cursor-pointer"
                    onClick={() => handleConversationClick(conv)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center overflow-hidden">
                          {display.avatar ? (
                            <img
                              src={display.avatar}
                              alt={display.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-bold text-primary">
                              {display.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        {display.isOnline && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-background" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h3 className="font-medium text-foreground truncate">
                            {display.name}
                          </h3>
                          {conv.last_message && (
                            <span className="text-xs text-muted-foreground">
                              {formatTime(conv.last_message.created_at)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.last_message?.content || "No messages yet"}
                        </p>
                      </div>

                      {/* Unread Badge */}
                      {conv.unread_count > 0 && (
                        <Badge variant="gold" className="text-xs min-w-[20px] justify-center">
                          {conv.unread_count}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredConversations.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">No conversations yet</p>
                <p className="text-sm text-muted-foreground">
                  Connect with other players to start messaging
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Messages;
