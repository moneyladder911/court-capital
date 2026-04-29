import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLoungePosts } from "@/hooks/useLoungePosts";
import { useLoungeReactions } from "@/hooks/useLoungeReactions";
import { LoungePostCard } from "@/components/portal/LoungePost";

type PostType = "reading" | "watching" | "thinking" | "reacting";

const POST_TYPES: { value: PostType; label: string; emoji: string }[] = [
  { value: "thinking", label: "Thinking", emoji: "💭" },
  { value: "reading", label: "Reading", emoji: "📖" },
  { value: "watching", label: "Watching", emoji: "🎬" },
  { value: "reacting", label: "Reacting", emoji: "⚡" },
];

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/4 rounded animate-pulse ${className}`} />;
}

const PortalLounge = () => {
  const { user } = useAuth();
  const { posts, loading, formatTimestamp } = useLoungePosts(user?.id);
  const { createPost, loading: posting } = useLoungeReactions(user?.id);

  const [postType, setPostType] = useState<PostType>("thinking");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const handlePost = async () => {
    if (!title.trim()) return;
    const result = await createPost(postType, title.trim(), content.trim() || undefined, link.trim() || undefined);
    if (result) {
      setTitle("");
      setContent("");
      setLink("");
      setShowCompose(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-2">Padel House</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground">The Lounge</h1>
        <p className="font-sans text-sm text-muted-foreground mt-2">Member-only community. Share what you're reading, watching, or thinking.</p>
      </div>

      {/* Compose */}
      {!showCompose ? (
        <button
          onClick={() => setShowCompose(true)}
          className="w-full text-left rounded-xl p-5 transition-all duration-200 hover:border-primary/30 group"
          style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}
        >
          <p className="font-sans text-sm text-muted-foreground group-hover:text-foreground/60 transition-colors">
            Share something with the house...
          </p>
        </button>
      ) : (
        <div className="rounded-xl p-6 space-y-4" style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(39 45% 61% / 0.2)" }}>
          {/* Post type */}
          <div className="flex gap-2 flex-wrap">
            {POST_TYPES.map((pt) => (
              <button
                key={pt.value}
                onClick={() => setPostType(pt.value)}
                className={`px-3 py-1.5 rounded-full font-sans text-[0.65rem] tracking-wide transition-all border ${
                  postType === pt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {pt.emoji} {pt.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent border-b border-border/40 py-2 font-display text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add more context (optional)"
            rows={2}
            className="w-full bg-transparent border-b border-border/40 py-2 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />

          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link (optional)"
            className="w-full bg-transparent border-b border-border/40 py-2 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setShowCompose(false)}
              className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              disabled={!title.trim() || posting}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-sans text-[0.65rem] tracking-[0.15em] uppercase rounded transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {posting ? "Posting..." : "Post to Lounge"}
            </button>
          </div>
        </div>
      )}

      {/* Feed */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <LoungePostCard key={post.id} post={post} formatTimestamp={formatTimestamp} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl p-16 text-center" style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 11%)" }}>
          <p className="font-display text-xl text-foreground mb-2">The Lounge is quiet</p>
          <p className="font-sans text-sm text-muted-foreground">Be the first to post something.</p>
        </div>
      )}
    </div>
  );
};

export default PortalLounge;
