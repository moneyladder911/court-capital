import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/hooks/useNotifications";

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_profile?: {
    name: string;
    avatar_url: string | null;
  };
}

export const useMessages = (conversationId: string | null, userId: string | undefined) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { notifyNewMessage } = useNotifications();

  const fetchMessages = useCallback(async () => {
    if (!conversationId || !userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Get sender profiles
      const messagesWithProfiles = await Promise.all(
        (data || []).map(async (msg) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("name, avatar_url")
            .eq("user_id", msg.sender_id)
            .single();

          return {
            ...msg,
            sender_profile: profile || undefined,
          };
        })
      );

      setMessages(messagesWithProfiles);

      // Mark messages as read
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", userId)
        .eq("is_read", false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [conversationId, userId, toast]);

  useEffect(() => {
    fetchMessages();

    if (!conversationId) return;

    // Subscribe to new messages in real-time
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const newMessage = payload.new as Message;
          
          // Get sender profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("name, avatar_url")
            .eq("user_id", newMessage.sender_id)
            .single();

          setMessages((prev) => [
            ...prev,
            { ...newMessage, sender_profile: profile || undefined },
          ]);

          // Mark as read and notify if not from current user
          if (newMessage.sender_id !== userId) {
            await supabase
              .from("messages")
              .update({ is_read: true })
              .eq("id", newMessage.id);
            
            // Send browser notification
            const senderName = profile?.name || "Someone";
            notifyNewMessage(senderName, newMessage.content, conversationId);
          }
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [conversationId, userId, fetchMessages]);

  const sendMessage = async (content: string) => {
    if (!conversationId || !userId || !content.trim()) return false;

    try {
      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_id: userId,
        content: content.trim(),
      });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);

      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return false;
    }
  };

  return { messages, loading, sendMessage, refetch: fetchMessages };
};
