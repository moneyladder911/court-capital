import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, CalendarPlus } from "lucide-react";
import { useJoinSession } from "@/hooks/useSessions";
import { useToast } from "@/hooks/use-toast";

interface JoinSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: {
    id: string;
    title: string;
    sport: string;
    location: string;
    scheduledAt: string;
    durationMinutes: number;
    maxParticipants: number;
    currentParticipants: number;
    hostName: string;
    skillLevel: string;
  };
}

export const JoinSessionDialog: React.FC<JoinSessionDialogProps> = ({
  open,
  onOpenChange,
  session,
}) => {
  const { toast } = useToast();
  const joinSession = useJoinSession();

  const handleJoin = async () => {
    try {
      await joinSession.mutateAsync(session.id);
      toast({
        title: "You're in! 🎉",
        description: `Successfully joined ${session.title}`,
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Failed to join",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const addToCalendar = () => {
    const startDate = new Date(session.scheduledAt);
    const endDate = new Date(
      startDate.getTime() + session.durationMinutes * 60 * 1000
    );

    const googleCalendarUrl = new URL(
      "https://calendar.google.com/calendar/render"
    );
    googleCalendarUrl.searchParams.set("action", "TEMPLATE");
    googleCalendarUrl.searchParams.set("text", session.title);
    googleCalendarUrl.searchParams.set("location", session.location);
    googleCalendarUrl.searchParams.set(
      "details",
      `CHAINPLAY Session: ${session.sport} with ${session.hostName}`
    );
    googleCalendarUrl.searchParams.set(
      "dates",
      `${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`
    );

    window.open(googleCalendarUrl.toString(), "_blank");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const spotsLeft = session.maxParticipants - session.currentParticipants;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Join Session</DialogTitle>
          <DialogDescription>
            Confirm your participation in this session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Session Info */}
          <div className="glass-card rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-foreground">{session.title}</h3>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(session.scheduledAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(session.scheduledAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{session.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{spotsLeft} spots left</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge variant="muted">{session.sport}</Badge>
              <Badge variant="muted">{session.skillLevel}</Badge>
            </div>
          </div>

          {/* Host Info */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="font-bold text-primary-foreground">
                {session.hostName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Hosted by {session.hostName}
              </p>
              <p className="text-xs text-muted-foreground">
                {session.durationMinutes} min session
              </p>
            </div>
          </div>

          {/* Commitment Notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Commitment matters.</strong> By
              joining, you agree to show up. No-shows affect your Trust Score and
              reliability rating.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto gap-2"
            onClick={addToCalendar}
          >
            <CalendarPlus className="w-4 h-4" />
            Add to Calendar
          </Button>
          <Button
            variant="gold"
            className="w-full sm:w-auto"
            onClick={handleJoin}
            disabled={joinSession.isPending || spotsLeft <= 0}
          >
            {joinSession.isPending ? "Joining..." : "Confirm & Join"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
