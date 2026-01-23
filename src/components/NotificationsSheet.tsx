import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Check } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

interface NotificationsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationsSheet: React.FC<NotificationsSheetProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { isSupported, permission, requestPermission } = useNotifications();

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </SheetTitle>
        </SheetHeader>

        {!isSupported ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BellOff className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Notifications are not supported in your browser.
            </p>
          </div>
        ) : permission !== "granted" ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Stay in the loop</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Enable notifications to get alerts about new sessions, messages, and connections.
            </p>
            <Button onClick={handleEnableNotifications} variant="gold">
              Enable Notifications
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-green-500 mb-6">
              <Check className="w-4 h-4" />
              Notifications enabled
            </div>
            
            <div className="text-center py-8 text-muted-foreground text-sm">
              No new notifications
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
