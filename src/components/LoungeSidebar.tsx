import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users } from "lucide-react";
import { LoungeVibe } from "@/hooks/useLoungeVibe";
import { LoungePost } from "@/hooks/useLoungePosts";

interface LoungeSidebarProps {
  activeMembers: LoungePost[];
  vibe: LoungeVibe | null;
  vibeLoading?: boolean;
}

export const LoungeSidebar: React.FC<LoungeSidebarProps> = ({
  activeMembers,
  vibe,
  vibeLoading,
}) => {
  const uniqueMembers = Array.from(
    new Map(activeMembers.map((post) => [post.user_id, post])).values()
  ).slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Active Members */}
      <div className="glass-card rounded-lg p-4 border border-border-gold/20">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Active in The Lounge</h3>
        </div>

        {uniqueMembers.length > 0 ? (
          <div className="flex items-center gap-2">
            {uniqueMembers.map((post, index) => (
              <div
                key={post.user_id}
                className="group relative"
                style={{ marginLeft: index > 0 ? "-8px" : "0" }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center border-2 border-background hover:border-border-gold transition-all cursor-pointer"
                  title={post.profile?.name}
                >
                  {post.profile?.avatar_url ? (
                    <img
                      src={post.profile.avatar_url}
                      alt={post.profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary-foreground">
                      {post.profile?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-card rounded text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-border-gold/30">
                  {post.profile?.name || "Anonymous"}
                </div>
              </div>
            ))}

            {activeMembers.length > 6 && (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground border-2 border-background">
                +{activeMembers.length - 6}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No one active yet</p>
        )}
      </div>

      {/* Tonight's Vibe */}
      <div className="glass-card rounded-lg p-4 border border-border-gold/20">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Tonight's Vibe</h3>
        </div>

        {vibeLoading ? (
          <div className="h-16 bg-card/50 rounded animate-pulse" />
        ) : vibe ? (
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            "{vibe.prompt}"
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">Check back for today's conversation prompt</p>
        )}
      </div>
    </div>
  );
};
