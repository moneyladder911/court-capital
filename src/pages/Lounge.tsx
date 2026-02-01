import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { LoungePostInput } from "@/components/LoungePostInput";
import { LoungePostCard } from "@/components/LoungePostCard";
import { LoungeThreadView } from "@/components/LoungeThreadView";
import { LoungeSidebar } from "@/components/LoungeSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useLoungePosts, ReactionType, PostType } from "@/hooks/useLoungePosts";
import { useLoungeReactions } from "@/hooks/useLoungeReactions";
import { useLoungeThreads } from "@/hooks/useLoungeThreads";
import { useLoungeVibe } from "@/hooks/useLoungeVibe";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Lounge = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, profile } = useAuth();
  const { posts, loading, formatTimestamp } = useLoungePosts(user?.id);
  const { toggleReaction, createPost, deletePost } = useLoungeReactions(user?.id);
  const { vibe, loading: vibeLoading } = useLoungeVibe();
  const { toast } = useToast();

  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());

  // Auto-refresh posts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Join The Lounge</h2>
          <p className="text-muted-foreground mb-6">
            Sign in to share what you're reading, watching, thinking, or reacting to
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }

  const handlePost = async (type: PostType, title: string, content?: string, link?: string) => {
    const result = await createPost(type, title, content, link);
    if (result) {
      toast({
        description: "Post dropped successfully",
      });
    }
  };

  const handleReact = async (postId: string, reactionType: ReactionType) => {
    await toggleReaction(postId, reactionType);
  };

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
      toast({
        description: "Post deleted",
      });
    }
  };

  const toggleThreads = (postId: string) => {
    setExpandedThreads((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
            The Lounge
          </h1>
          <p className="text-muted-foreground text-sm mt-1">No agenda. Just vibes.</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feed Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Post Input */}
            <LoungePostInput
              onPost={handlePost}
              isLoading={loading}
              userAvatar={profile?.avatar_url}
              userName={profile?.name}
            />

            {/* Posts Feed */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-lg p-4 border border-border-gold/20 animate-pulse"
                  >
                    <div className="h-12 bg-card rounded mb-3" />
                    <div className="h-6 bg-card rounded mb-2" />
                    <div className="h-6 bg-card rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="glass-card rounded-lg p-12 border border-border-gold/20 text-center">
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">No posts yet. Be the first to drop something!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id}>
                    <LoungePostCard
                      post={post}
                      formatTimestamp={formatTimestamp}
                      onReact={handleReact}
                      onExpandThreads={toggleThreads}
                      onDelete={handleDelete}
                      isOwnPost={post.user_id === user?.id}
                      threadsExpanded={expandedThreads.has(post.id)}
                    />

                    {/* Thread View */}
                    {expandedThreads.has(post.id) && post.thread_count > 0 && (
                      <ThreadExpandedView
                        postId={post.id}
                        threadCount={post.thread_count}
                        onClose={() => toggleThreads(post.id)}
                        userId={user?.id}
                        formatTimestamp={formatTimestamp}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <LoungeSidebar
                activeMembers={posts}
                vibe={vibe}
                vibeLoading={vibeLoading}
              />
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden mt-8">
          <LoungeSidebar
            activeMembers={posts}
            vibe={vibe}
            vibeLoading={vibeLoading}
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

// Thread Expanded View Component
const ThreadExpandedView: React.FC<{
  postId: string;
  threadCount: number;
  onClose: () => void;
  userId?: string;
  formatTimestamp: (timestamp: string) => string;
}> = ({ postId, threadCount, userId, formatTimestamp }) => {
  const { threads, loading, addThread } = useLoungeThreads(postId, userId);
  const [replyContent, setReplyContent] = React.useState("");
  const [replyLoading, setReplyLoading] = React.useState(false);

  const handleAddReply = async () => {
    if (!replyContent.trim()) return;

    setReplyLoading(true);
    try {
      await addThread(replyContent.trim());
      setReplyContent("");
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-lg p-4 border border-border-gold/20 mt-2 ml-4 border-l-2 border-l-primary">
      {/* Thread Replies */}
      <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
        {loading ? (
          <div className="h-12 bg-card/50 rounded animate-pulse" />
        ) : threads.length > 0 ? (
          threads.map((thread) => (
            <div key={thread.id} className="bg-card/30 rounded p-3 border border-border/20">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 border border-border-gold/30">
                  {thread.profile?.avatar_url ? (
                    <img
                      src={thread.profile.avatar_url}
                      alt={thread.profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary-foreground">
                      {thread.profile?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <span className="text-xs font-medium text-foreground">{thread.profile?.name || "Anonymous"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatTimestamp(thread.created_at)}</p>
                </div>
              </div>

              <p className="text-sm text-foreground break-words">{thread.content}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground">No replies yet</p>
        )}
      </div>

      {/* Add Reply */}
      {userId && (
        <div className="space-y-2 bg-card/20 rounded p-3">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Drop a reply..."
            className="w-full bg-card border border-border/30 focus:border-border-gold/50 rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setReplyContent("")}
              disabled={replyLoading}
              className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground rounded hover:bg-card transition-colors disabled:opacity-50"
            >
              Clear
            </button>
            <button
              onClick={handleAddReply}
              disabled={!replyContent.trim() || replyLoading}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {replyLoading ? "Replying..." : "Reply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lounge;
