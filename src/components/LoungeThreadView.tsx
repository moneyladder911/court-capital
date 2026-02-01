import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MemberTierBadge, type MemberTier } from "@/components/MemberTierBadge";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { ThreadReply } from "@/hooks/useLoungeThreads";

interface LoungeThreadViewProps {
  threadCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  threads: ThreadReply[];
  onAddReply: (content: string) => Promise<void>;
  formatTimestamp: (timestamp: string) => string;
  isLoading?: boolean;
}

export const LoungeThreadView: React.FC<LoungeThreadViewProps> = ({
  threadCount,
  isExpanded,
  onToggle,
  threads,
  onAddReply,
  formatTimestamp,
  isLoading,
}) => {
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const handleAddReply = async () => {
    if (!replyContent.trim()) return;

    setReplyLoading(true);
    try {
      await onAddReply(replyContent.trim());
      setReplyContent("");
    } finally {
      setReplyLoading(false);
    }
  };

  if (threadCount === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-border/20">
      {/* Thread Toggle */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 group"
      >
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        <MessageCircle className="w-4 h-4" />
        <span>{threadCount} {threadCount === 1 ? "reply" : "replies"}</span>
      </button>

      {/* Expanded Thread View */}
      {isExpanded && (
        <div className="space-y-3 ml-4">
          {/* Thread Replies */}
          <div className="space-y-3 max-h-96 overflow-y-auto mb-3">
            {threads.map((thread) => (
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
                      <MemberTierBadge
                        tier={(thread.profile?.member_tier as MemberTier) || "explorer"}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{formatTimestamp(thread.created_at)}</p>
                  </div>
                </div>

                <p className="text-sm text-foreground break-words">{thread.content}</p>
              </div>
            ))}
          </div>

          {/* Add Reply */}
          <div className="space-y-2 bg-card/20 rounded p-3">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Drop a reply..."
              className="bg-card border-border/30 focus:border-border-gold/50 resize-none text-sm"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setReplyContent("")}
                disabled={replyLoading || isLoading}
              >
                Clear
              </Button>
              <Button
                size="sm"
                variant="gold"
                onClick={handleAddReply}
                disabled={!replyContent.trim() || replyLoading || isLoading}
              >
                {replyLoading || isLoading ? "Replying..." : "Reply"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
