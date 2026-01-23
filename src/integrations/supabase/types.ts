export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          category: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          points_required: number | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          points_required?: number | null
        }
        Update: {
          category?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          points_required?: number | null
        }
        Relationships: []
      }
      connections: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          receiver_id: string
          requester_id: string
          status: Database["public"]["Enums"]["connection_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          receiver_id: string
          requester_id: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          receiver_id?: string
          requester_id?: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string | null
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_rsvps: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_at: string | null
          event_type: Database["public"]["Enums"]["event_type"] | null
          host_id: string
          id: string
          image_url: string | null
          is_vip: boolean | null
          location: string
          max_participants: number | null
          price: number | null
          scheduled_at: string
          skill_level: Database["public"]["Enums"]["skill_level"] | null
          sport: Database["public"]["Enums"]["sport_type"] | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_at?: string | null
          event_type?: Database["public"]["Enums"]["event_type"] | null
          host_id: string
          id?: string
          image_url?: string | null
          is_vip?: boolean | null
          location: string
          max_participants?: number | null
          price?: number | null
          scheduled_at: string
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          sport?: Database["public"]["Enums"]["sport_type"] | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_at?: string | null
          event_type?: Database["public"]["Enums"]["event_type"] | null
          host_id?: string
          id?: string
          image_url?: string | null
          is_vip?: boolean | null
          location?: string
          max_participants?: number | null
          price?: number | null
          scheduled_at?: string
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          sport?: Database["public"]["Enums"]["sport_type"] | null
          title?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          energy_score: number | null
          giver_id: string
          id: string
          receiver_id: string
          reliability_score: number | null
          session_id: string | null
          skill_accuracy: boolean | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          energy_score?: number | null
          giver_id: string
          id?: string
          receiver_id: string
          reliability_score?: number | null
          session_id?: string | null
          skill_accuracy?: boolean | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          energy_score?: number | null
          giver_id?: string
          id?: string
          receiver_id?: string
          reliability_score?: number | null
          session_id?: string | null
          skill_accuracy?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          city: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          is_private: boolean | null
          name: string
          sport: Database["public"]["Enums"]["sport_type"] | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_private?: boolean | null
          name: string
          sport?: Database["public"]["Enums"]["sport_type"] | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_private?: boolean | null
          name?: string
          sport?: Database["public"]["Enums"]["sport_type"] | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          attendance_rate: number | null
          availability:
            | Database["public"]["Enums"]["availability_pattern"][]
            | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string | null
          crypto_focus: string[] | null
          crypto_role: Database["public"]["Enums"]["crypto_role"] | null
          energy_style: Database["public"]["Enums"]["energy_style"] | null
          id: string
          is_online: boolean | null
          is_trusted: boolean | null
          is_verified: boolean | null
          last_seen: string | null
          looking_for: string[] | null
          member_since: string | null
          member_tier: Database["public"]["Enums"]["member_tier"] | null
          mindset: Database["public"]["Enums"]["mindset_tag"] | null
          name: string
          no_shows: number | null
          sessions_as_host: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attendance_rate?: number | null
          availability?:
            | Database["public"]["Enums"]["availability_pattern"][]
            | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          crypto_focus?: string[] | null
          crypto_role?: Database["public"]["Enums"]["crypto_role"] | null
          energy_style?: Database["public"]["Enums"]["energy_style"] | null
          id?: string
          is_online?: boolean | null
          is_trusted?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          looking_for?: string[] | null
          member_since?: string | null
          member_tier?: Database["public"]["Enums"]["member_tier"] | null
          mindset?: Database["public"]["Enums"]["mindset_tag"] | null
          name: string
          no_shows?: number | null
          sessions_as_host?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attendance_rate?: number | null
          availability?:
            | Database["public"]["Enums"]["availability_pattern"][]
            | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          crypto_focus?: string[] | null
          crypto_role?: Database["public"]["Enums"]["crypto_role"] | null
          energy_style?: Database["public"]["Enums"]["energy_style"] | null
          id?: string
          is_online?: boolean | null
          is_trusted?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          looking_for?: string[] | null
          member_since?: string | null
          member_tier?: Database["public"]["Enums"]["member_tier"] | null
          mindset?: Database["public"]["Enums"]["mindset_tag"] | null
          name?: string
          no_shows?: number | null
          sessions_as_host?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      session_participants: {
        Row: {
          id: string
          joined_at: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          crypto_focus: string | null
          description: string | null
          duration_minutes: number | null
          host_id: string
          id: string
          is_live: boolean | null
          latitude: number | null
          location: string
          longitude: number | null
          max_participants: number | null
          scheduled_at: string
          skill_level: Database["public"]["Enums"]["skill_level"] | null
          sport: Database["public"]["Enums"]["sport_type"]
          title: string
        }
        Insert: {
          created_at?: string | null
          crypto_focus?: string | null
          description?: string | null
          duration_minutes?: number | null
          host_id: string
          id?: string
          is_live?: boolean | null
          latitude?: number | null
          location: string
          longitude?: number | null
          max_participants?: number | null
          scheduled_at: string
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          sport: Database["public"]["Enums"]["sport_type"]
          title: string
        }
        Update: {
          created_at?: string | null
          crypto_focus?: string | null
          description?: string | null
          duration_minutes?: number | null
          host_id?: string
          id?: string
          is_live?: boolean | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          max_participants?: number | null
          scheduled_at?: string
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          sport?: Database["public"]["Enums"]["sport_type"]
          title?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          connections_made: number | null
          created_at: string | null
          current_streak: number | null
          events_attended: number | null
          id: string
          longest_streak: number | null
          sessions_attended: number | null
          sessions_hosted: number | null
          total_points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          connections_made?: number | null
          created_at?: string | null
          current_streak?: number | null
          events_attended?: number | null
          id?: string
          longest_streak?: number | null
          sessions_attended?: number | null
          sessions_hosted?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          connections_made?: number | null
          created_at?: string | null
          current_streak?: number | null
          events_attended?: number | null
          id?: string
          longest_streak?: number | null
          sessions_attended?: number | null
          sessions_hosted?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sports: {
        Row: {
          created_at: string | null
          id: string
          skill_level: number | null
          sport: Database["public"]["Enums"]["sport_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          skill_level?: number | null
          sport: Database["public"]["Enums"]["sport_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          skill_level?: number | null
          sport?: Database["public"]["Enums"]["sport_type"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_member_tier: {
        Args: {
          p_attendance_rate: number
          p_is_trusted: boolean
          p_sessions_attended: number
          p_sessions_hosted: number
          p_total_points: number
        }
        Returns: Database["public"]["Enums"]["member_tier"]
      }
    }
    Enums: {
      availability_pattern:
        | "early_bird"
        | "lunch_warrior"
        | "after_work"
        | "night_owl"
        | "weekends"
        | "flexible"
      connection_status: "pending" | "accepted" | "rejected"
      crypto_role: "founder" | "trader" | "investor" | "vc" | "dev" | "marketer"
      energy_style: "competitive" | "social" | "strategic" | "learning"
      event_type: "tournament" | "meetup" | "retreat" | "camp" | "casual"
      member_tier: "explorer" | "core" | "elite" | "inner_circle"
      mindset_tag: "builder" | "competitor" | "strategist" | "investor"
      skill_level: "beginner" | "intermediate" | "advanced" | "pro"
      sport_type:
        | "padel"
        | "tennis"
        | "golf"
        | "gym"
        | "running"
        | "combat"
        | "yoga"
        | "pilates"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      availability_pattern: [
        "early_bird",
        "lunch_warrior",
        "after_work",
        "night_owl",
        "weekends",
        "flexible",
      ],
      connection_status: ["pending", "accepted", "rejected"],
      crypto_role: ["founder", "trader", "investor", "vc", "dev", "marketer"],
      energy_style: ["competitive", "social", "strategic", "learning"],
      event_type: ["tournament", "meetup", "retreat", "camp", "casual"],
      member_tier: ["explorer", "core", "elite", "inner_circle"],
      mindset_tag: ["builder", "competitor", "strategist", "investor"],
      skill_level: ["beginner", "intermediate", "advanced", "pro"],
      sport_type: [
        "padel",
        "tennis",
        "golf",
        "gym",
        "running",
        "combat",
        "yoga",
        "pilates",
      ],
    },
  },
} as const
