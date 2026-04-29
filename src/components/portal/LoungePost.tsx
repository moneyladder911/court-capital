import { useState } from "react";
import { MemberAvatar } from "./MemberAvatar";
import { useAuth } from "@/hooks/useAuth";
import { useLoungeReactions } from "@/hooks/useLoungeReactions";
import { useLoungeThreads } from "@/hooks/useLoungeThreads";
import type { LoungePost as LoungePostType } from "@/hooks/useLoungePosts";

const REACTION_CONFIG = [
  { type: "seen" as const, emoji: "👁", label: "Seen" },
  { type: "interesting" as const, emoji: "⚡", label: "Interesting" },
  { type: "vibe" as const, emoji: "🔥", label: "Vibe" },
];

const POST_TYPE_LABELS: Record<string, string> = {
  reading: "Reading",
  watching: "Watching",
  thinking: "Thinking",
  reacting: "Reacting",
  text: "Post",
  link: "Link",
  video: "Video",
};

interface LoungePostProps {
  post: LoungePostType;
  formatTimestamp: (ts: string) => string;
}

export function LoungePostCard({ post, formatTimestamp }: LoungePostProps) {
  const { user } = useAuth();
  const [showThreads, setShowThreads] = useState(false);
  const [replyText, setReplyText] = useState("");

  // useLoungeReactions takes (userId?) — handles per-post via postId in toggleReaction(postId, type)
  const { toggleReaction } = useLoungeReactions(user?.id);
  // useLoungeThreads takes (postId, userId?)
  const { threads, addThread, loading: threadsLoading } = useLoungeThreads(post.id, user?.id);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    await addThread(replyText.trim());
    setReplyText("");
  };

  const linkHostname = (url: string) => {
    try {
      return new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div
      className="rounded-xl p-6 transition-all duration-200"
      style={{
        background: "hsl(0 0% 6%)",
        border: "1px solid hsl(0 0% 11%)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <MemberAvatar
          name={post.profile.name}
          avatarUrl={post.profile.avatar_url}
          isOnline={post.profile.is_online}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-sm font-medium text-foreground">{post.profile.name}</span>
            <span className="font-sans text-[0.6rem] tracking-widest uppercase text-muted-foreground/60">
              {POST_TYPE_LABELS[post.post_type] || post.post_type}
            </span>
          </div>
          <p className="font-sans text-[0.65rem] text-muted-foreground">{formatTimestamp(post.created_at)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4 space-y-2">
        <h4 className="font-display text-base text-foreground leading-snug">{post.title}</h4>
        {post.content && (
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">{post.content}</p>
        )}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-xs text-primary hover:text-primary/80 transition-colors mt-1"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            {linkHostname(post.link)}
          </a>
        )}
      </div>

      {/* Reactions + Thread toggle */}
      <div className="flex items-center gap-4">
        {REACTION_CONFIG.map(({ type, emoji, label }) => {
          const count = post.reactions[type] || 0;
          const active = post.user_reactions?.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleReaction(post.id, type)}
              className={`flex items-center gap-1.5 font-sans text-xs transition-all duration-200 ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              title={label}
            >
              <span>{emoji}</span>
              {count > 0 && <span>{count}</span>}
            </button>
          );
        })}

        <button
          onClick={() => setShowThreads(!showThreads)}
          className="ml-auto flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {post.thread_count > 0 ? post.thread_count : "Reply"}
        </button>
      </div>

      {/* Threads */}
      {showThreads && (
        <div className="mt-5 pt-5 border-t border-border/40 space-y-4">
          {threadsLoading ? (
            <div className="h-8 bg-white/3 rounded animate-pulse" />
          ) : threads.length > 0 ? (
            threads.map((thread) => (
              <div key={thread.id} className="flex gap-3">
                <MemberAvatar
                  name={thread.profile?.name || "Member"}
                  avatarUrl={thread.profile?.avatar_url}
                  size="xs"
                />
                <div>
                  <p className="font-sans text-xs font-medium text-foreground">{thread.profile?.name || "Member"}</p>
                  <p className="font-sans text-xs text-muted-foreground">{thread.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="font-sans text-xs text-muted-foreground">No replies yet. Be the first.</p>
          )}

          {/* Reply input */}
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Add a reply..."
              onKeyDown={(e) => e.key === "Enter" && handleReply()}
              className="flex-1 bg-transparent border-b border-border/40 text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors py-1.5"
            />
            <button
              onClick={handleReply}
              disabled={!replyText.trim()}
              className="font-sans text-[0.65rem] tracking-wider uppercase text-primary disabled:text-muted-foreground transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
