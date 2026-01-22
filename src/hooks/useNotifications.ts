import { useCallback, useEffect, useState } from "react";

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const supported = "Notification" in window;
    setIsSupported(supported);
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }, [isSupported]);

  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (!isSupported || permission !== "granted") return null;

      try {
        const notification = new Notification(title, {
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          ...options,
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        return notification;
      } catch (error) {
        console.error("Error showing notification:", error);
        return null;
      }
    },
    [isSupported, permission]
  );

  const notifyNewMessage = useCallback(
    (senderName: string, messagePreview: string, conversationId?: string) => {
      // Don't notify if the window is focused
      if (document.hasFocus()) return;

      return showNotification(`New message from ${senderName}`, {
        body: messagePreview.length > 50 
          ? messagePreview.substring(0, 50) + "..." 
          : messagePreview,
        tag: conversationId || "new-message",
      });
    },
    [showNotification]
  );

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification,
    notifyNewMessage,
  };
};
