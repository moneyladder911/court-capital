import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Users, AlertTriangle } from "lucide-react";
import { useSessionParticipants, useMarkAttendance } from "@/hooks/useSessionParticipation";
import { useToast } from "@/hooks/use-toast";

interface AttendanceConfirmationProps {
  sessionId: string;
  sessionTitle: string;
  onComplete?: () => void;
}

export const AttendanceConfirmation: React.FC<AttendanceConfirmationProps> = ({
  sessionId,
  sessionTitle,
  onComplete,
}) => {
  const { toast } = useToast();
  const { data: participants, isLoading } = useSessionParticipants(sessionId);
  const markAttendance = useMarkAttendance();
  const [markedParticipants, setMarkedParticipants] = useState<Set<string>>(
    new Set()
  );

  const handleMarkAttendance = async (
    participantId: string,
    attended: boolean
  ) => {
    try {
      await markAttendance.mutateAsync({ participantId, attended });
      setMarkedParticipants((prev) => new Set([...prev, participantId]));
      toast({
        title: attended ? "Marked as attended" : "Marked as no-show",
        description: attended
          ? "Attendance confirmed"
          : "No-show recorded. Their Trust Score will be affected.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark attendance",
        variant: "destructive",
      });
    }
  };

  const unmarkedCount =
    participants?.filter(
      (p) => p.attended === null && !markedParticipants.has(p.id)
    ).length || 0;

  const handleCompleteConfirmation = () => {
    if (unmarkedCount > 0) {
      toast({
        title: "Incomplete",
        description: `${unmarkedCount} participant(s) still need to be marked`,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Attendance Complete! ✅",
      description: "All participants have been marked",
    });
    onComplete?.();
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/2 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!participants || participants.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 text-center">
        <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No participants to confirm</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-foreground">
            Confirm Attendance
          </h3>
          <p className="text-sm text-muted-foreground">{sessionTitle}</p>
        </div>
        <Badge variant={unmarkedCount === 0 ? "success" : "muted"}>
          {participants.length - unmarkedCount}/{participants.length} marked
        </Badge>
      </div>

      <div className="space-y-2">
        {participants.map((participant) => {
          const isMarked =
            participant.attended !== null ||
            markedParticipants.has(participant.id);
          const attended =
            participant.attended ?? markedParticipants.has(participant.id);

          return (
            <div
              key={participant.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                isMarked
                  ? participant.attended === false
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-success/5 border-success/20"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-card border border-border flex items-center justify-center">
                  {participant.avatarUrl ? (
                    <img
                      src={participant.avatarUrl}
                      alt={participant.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-primary">
                      {participant.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {participant.name}
                  </p>
                  {isMarked && (
                    <p
                      className={`text-xs ${
                        participant.attended === false
                          ? "text-destructive"
                          : "text-success"
                      }`}
                    >
                      {participant.attended === false
                        ? "No-show"
                        : "Attended"}
                    </p>
                  )}
                </div>
              </div>

              {!isMarked ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() =>
                      handleMarkAttendance(participant.id, false)
                    }
                    disabled={markAttendance.isPending}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={() =>
                      handleMarkAttendance(participant.id, true)
                    }
                    disabled={markAttendance.isPending}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    participant.attended === false
                      ? "bg-destructive/20 text-destructive"
                      : "bg-success/20 text-success"
                  }`}
                >
                  {participant.attended === false ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {unmarkedCount > 0 && (
        <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">{unmarkedCount}</strong>{" "}
            participant(s) still need to be marked
          </p>
        </div>
      )}

      <Button
        variant="gold"
        className="w-full"
        onClick={handleCompleteConfirmation}
        disabled={unmarkedCount > 0}
      >
        Complete Attendance
      </Button>
    </div>
  );
};
