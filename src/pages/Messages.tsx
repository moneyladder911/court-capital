import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ChatView } from "@/components/ChatView";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/hooks/useAuth";
import { MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export const Messages: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { conversations, loading } = useConversations(user?.id);
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    otherUserName: string;
    otherUserAvatar: string | null;
    isOnline: boolean;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-md mx-auto px-4 pb-32 pt-4">
          <div className="glass-card rounded-xl p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-display text-xl font-bold mb-4">Messages</h2>
            <p className="text-muted-foreground mb-6">
              Sign in to view your messages and connect with other members.
            </p>
            <Button variant="gold" onClick={() => window.location.href = "/auth"}>
              Sign In
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-md mx-auto px-4 pb-4 pt-4">
          <ChatView
            conversationId={selectedConversation.id}
            userId={user!.id}
            otherUserName={selectedConversation.otherUserName}
            otherUserAvatar={selectedConversation.otherUserAvatar}
            isOnline={selectedConversation.isOnline}
            onBack={() => setSelectedConversation(null)}
          />
        </main>
      </div>
    );
  }

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const otherParticipant = conv.participants.find((p) => p.user_id !== user?.id);
    return otherParticipant?.profile?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-md mx-auto px-4 pb-32 pt-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h1 className="font-display text-2xl font-bold">Messages</h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Conversations List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No conversations yet</p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Connect with members to start chatting
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conv) => {
              const otherParticipant = conv.participants.find((p) => p.user_id !== user?.id);
              const profile = otherParticipant?.profile;

              return (
                <button
                  key={conv.id}
                  onClick={() =>
                    setSelectedConversation({
                      id: conv.id,
                      otherUserName: profile?.name || "Unknown",
                      otherUserAvatar: profile?.avatar_url || null,
                      isOnline: profile?.is_online || false,
                    })
                  }
                  className="w-full glass-card rounded-xl p-4 flex items-center gap-3 text-left hover:border-primary/30 transition-colors"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          {profile?.name?.charAt(0) || "?"}
                        </span>
                      )}
                    </div>
                    {profile?.is_online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground truncate">
                        {profile?.name || "Unknown"}
                      </span>
                      {conv.last_message && (
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conv.last_message.created_at), {
                            addSuffix: false,
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.last_message?.content || "No messages yet"}
                    </p>
                  </div>

                  {conv.unread_count > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {conv.unread_count}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Messages;
