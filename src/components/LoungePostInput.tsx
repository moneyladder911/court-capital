import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Tv2, Brain, Flame, X } from "lucide-react";
import { PostType } from "@/hooks/useLoungePosts";

interface LoungePostInputProps {
  onPost: (type: PostType, title: string, content?: string, link?: string) => Promise<void>;
  isLoading?: boolean;
  userAvatar?: string | null;
  userName?: string;
}

const POST_TYPES = [
  { value: "reading" as PostType, label: "Reading", icon: BookOpen, color: "text-blue-400" },
  { value: "watching" as PostType, label: "Watching", icon: Tv2, color: "text-purple-400" },
  { value: "thinking" as PostType, label: "Thinking", icon: Brain, color: "text-amber-400" },
  { value: "reacting" as PostType, label: "Reacting", icon: Flame, color: "text-red-400" },
];

export const LoungePostInput: React.FC<LoungePostInputProps> = ({
  onPost,
  isLoading,
  userAvatar,
  userName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postType, setPostType] = useState<PostType>("thinking");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onPost(postType, title.trim(), content.trim() || undefined, link.trim() || undefined);
      setTitle("");
      setContent("");
      setLink("");
      setIsExpanded(false);
      setPostType("thinking");
    } finally {
      setSubmitting(false);
    }
  };

  const currentType = POST_TYPES.find((t) => t.value === postType);
  const Icon = currentType?.icon || Brain;

  const charCount = content.length;
  const maxChars = 140;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="sticky top-0 z-20 mb-6 glass-card rounded-lg border border-border-gold/30 p-4 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 border border-border-gold/30">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-primary-foreground">
              {userName?.charAt(0).toUpperCase() || "Y"}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{userName || "You"}</p>
          <p className="text-xs text-muted-foreground">Drop something</p>
        </div>

        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 hover:bg-card rounded transition-colors text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Expanded Form */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Post Type Selector */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              What are you sharing?
            </label>
            <div className="flex gap-2 flex-wrap">
              {POST_TYPES.map((type) => {
                const TypeIcon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setPostType(type.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      postType === type.value
                        ? "bg-primary/20 text-primary border border-primary"
                        : "bg-card border border-border/30 text-muted-foreground hover:border-border-gold/50"
                    }`}
                  >
                    <TypeIcon className="w-4 h-4" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Title or headline
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="bg-card border-border/30 focus:border-border-gold/50"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground mt-1">{title.length}/100 characters</p>
          </div>

          {/* Content Input */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Add context (optional)
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
              placeholder="Add a short note..."
              className={`bg-card border-border/30 focus:border-border-gold/50 resize-none ${
                isOverLimit ? "border-destructive" : ""
              }`}
              rows={3}
            />
            <p className={`text-xs mt-1 ${isOverLimit ? "text-destructive" : "text-muted-foreground"}`}>
              {charCount}/{maxChars} characters
            </p>
          </div>

          {/* Link Input */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Link (optional)
            </label>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              className="bg-card border-border/30 focus:border-border-gold/50"
              type="url"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setContent("");
                setLink("");
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gold"
              disabled={!title.trim() || submitting || isLoading}
            >
              {submitting || isLoading ? "Posting..." : "Drop"}
            </Button>
          </div>
        </form>
      )}

      {/* Collapsed State */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full text-left px-3 py-2 rounded-md hover:bg-card transition-colors text-muted-foreground hover:text-foreground group"
        >
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${currentType?.color}`} />
            <span className="text-sm">What's happening in the Web3 world?</span>
          </div>
        </button>
      )}
    </div>
  );
};
