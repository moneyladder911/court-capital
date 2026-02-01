import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Brain, Flame, BookOpen, Tv2, MessageCircle, ExternalLink, Trash2 } from "lucide-react";
import { MemberTierBadge, type MemberTier } from "@/components/MemberTierBadge";
import { LoungePost, PostType, ReactionType } from "@/hooks/useLoungePosts";

interface LoungePostCardProps {
  post: LoungePost;
  formatTimestamp: (timestamp: string) => string;
  onReact: (postId: string, reactionType: ReactionType) => void;
  onExpandThreads?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  isOwnPost?: boolean;
  threadsExpanded?: boolean;
}

const getPostTypeIcon = (type: PostType) => {
  switch (type) {
    case "reading":
      return <BookOpen className="w-4 h-4" />;
    case "watching":
      return <Tv2 className="w-4 h-4" />;
    case "thinking":
      return <Brain className="w-4 h-4" />;
    case "reacting":
      return <Flame className="w-4 h-4" />;
  }
};

const getPostTypeLabel = (type: PostType) => {
  switch (type) {
    case "reading":
      return "Reading";
    case "watching":
      return "Watching";
    case "thinking":
      return "Thinking";
    case "reacting":
      return "Reacting";
  }
};

const getPostTypeColor = (type: PostType) => {
  switch (type) {
    case "reading":
      return "bg-blue-500/10 text-blue-300";
    case "watching":
      return "bg-purple-500/10 text-purple-300";
    case "thinking":
      return "bg-amber-500/10 text-amber-300";
    case "reacting":
      return "bg-red-500/10 text-red-300";
  }
};

export const LoungePostCard: React.FC<LoungePostCardProps> = ({
  post,
  formatTimestamp,
  onReact,
  onExpandThreads,
  onDelete,
  isOwnPost,
  threadsExpanded,
}) => {
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);

  const handleReactionClick = (type: ReactionType) => {
    onReact(post.id, type);
  };

  return (
    <div className="glass-card rounded-lg p-4 border border-border-gold/20 hover:border-border-gold/40 transition-all duration-300 group fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center border border-border-gold/30">
              {post.profile?.avatar_url ? (
                <img
                  src={post.profile.avatar_url}
                  alt={post.profile.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-primary-foreground">
                  {post.profile?.name?.charAt(0).toUpperCase() || "?"}
                </span>
              )}
            </div>
            {post.profile?.is_online && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border border-background" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-medium text-foreground">{post.profile?.name || "Anonymous"}</h3>
              <MemberTierBadge tier={(post.profile?.member_tier as MemberTier) || "explorer"} size="sm" showLabel={false} />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="muted" className="text-xs">
                {post.profile?.role || "Member"}
              </Badge>
              <span>•</span>
              <span>{formatTimestamp(post.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Post Type Badge */}
        <div className={`px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium ${getPostTypeColor(post.post_type)} flex-shrink-0 ml-2`}>
          {getPostTypeIcon(post.post_type)}
          <span className="hidden sm:inline">{getPostTypeLabel(post.post_type)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <h4 className="font-medium text-foreground mb-1 break-words">{post.title}</h4>
        {post.content && (
          <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
        )}
      </div>

      {/* Link Preview */}
      {post.link && (
        <div className="mb-3 p-2 bg-card/50 rounded border border-border/30 flex items-center gap-2 hover:border-border-gold/30 transition-colors">
          <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary-glow truncate"
          >
            {post.link.replace(/^https?:\/\//, "")}
          </a>
        </div>
      )}

      {/* Reactions and Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border/20">
        <div className="flex items-center gap-1">
          {/* Seen */}
          <button
            onClick={() => handleReactionClick("seen")}
            onMouseEnter={() => setHoveredReaction("seen")}
            onMouseLeave={() => setHoveredReaction(null)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
              post.user_reactions?.includes("seen")
                ? "bg-blue-500/20 text-blue-300"
                : "text-muted-foreground hover:bg-card"
            }`}
            title="Mark as seen"
          >
            <Eye className="w-3.5 h-3.5" />
            {post.reactions.seen > 0 && <span className="text-xs">{post.reactions.seen}</span>}
          </button>

          {/* Interesting */}
          <button
            onClick={() => handleReactionClick("interesting")}
            onMouseEnter={() => setHoveredReaction("interesting")}
            onMouseLeave={() => setHoveredReaction(null)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
              post.user_reactions?.includes("interesting")
                ? "bg-amber-500/20 text-amber-300"
                : "text-muted-foreground hover:bg-card"
            }`}
            title="Mark as interesting"
          >
            <Brain className="w-3.5 h-3.5" />
            {post.reactions.interesting > 0 && <span className="text-xs">{post.reactions.interesting}</span>}
          </button>

          {/* Vibe */}
          <button
            onClick={() => handleReactionClick("vibe")}
            onMouseEnter={() => setHoveredReaction("vibe")}
            onMouseLeave={() => setHoveredReaction(null)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
              post.user_reactions?.includes("vibe")
                ? "bg-green-500/20 text-green-300"
                : "text-muted-foreground hover:bg-card"
            }`}
            title="Vibe"
          >
            <span className="text-base">💯</span>
            {post.reactions.vibe > 0 && <span className="text-xs">{post.reactions.vibe}</span>}
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Thread Button */}
          {post.thread_count > 0 && (
            <button
              onClick={() => onExpandThreads?.(post.id)}
              className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:bg-card transition-all"
              title="View replies"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{post.thread_count}</span>
            </button>
          )}

          {/* Delete Button */}
          {isOwnPost && (
            <button
              onClick={() => onDelete?.(post.id)}
              className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
              title="Delete post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
