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
      brand_bundles: {
        Row: {
          brand_name: string
          brand_values: string[] | null
          confidence_mission: number | null
          confidence_offerings: number | null
          confidence_voice: number | null
          created_at: string
          cta_library: string[] | null
          id: string
          keywords: string[] | null
          logo_url: string | null
          mission: string | null
          offerings: Json | null
          pain_points: string[] | null
          primary_audience: string | null
          proof: string[] | null
          style: string | null
          tone: string | null
          updated_at: string
          user_id: string
          vision: string | null
          website_url: string | null
        }
        Insert: {
          brand_name: string
          brand_values?: string[] | null
          confidence_mission?: number | null
          confidence_offerings?: number | null
          confidence_voice?: number | null
          created_at?: string
          cta_library?: string[] | null
          id?: string
          keywords?: string[] | null
          logo_url?: string | null
          mission?: string | null
          offerings?: Json | null
          pain_points?: string[] | null
          primary_audience?: string | null
          proof?: string[] | null
          style?: string | null
          tone?: string | null
          updated_at?: string
          user_id: string
          vision?: string | null
          website_url?: string | null
        }
        Update: {
          brand_name?: string
          brand_values?: string[] | null
          confidence_mission?: number | null
          confidence_offerings?: number | null
          confidence_voice?: number | null
          created_at?: string
          cta_library?: string[] | null
          id?: string
          keywords?: string[] | null
          logo_url?: string | null
          mission?: string | null
          offerings?: Json | null
          pain_points?: string[] | null
          primary_audience?: string | null
          proof?: string[] | null
          style?: string | null
          tone?: string | null
          updated_at?: string
          user_id?: string
          vision?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      generated_posts: {
        Row: {
          angle: string | null
          brand_bundle_id: string
          content: string
          created_at: string
          cta: string | null
          goal: string | null
          hashtags: string[] | null
          id: string
          method: Database["public"]["Enums"]["post_method"]
          platform: Database["public"]["Enums"]["platform"]
          topic: string | null
          user_id: string
        }
        Insert: {
          angle?: string | null
          brand_bundle_id: string
          content: string
          created_at?: string
          cta?: string | null
          goal?: string | null
          hashtags?: string[] | null
          id?: string
          method: Database["public"]["Enums"]["post_method"]
          platform: Database["public"]["Enums"]["platform"]
          topic?: string | null
          user_id: string
        }
        Update: {
          angle?: string | null
          brand_bundle_id?: string
          content?: string
          created_at?: string
          cta?: string | null
          goal?: string | null
          hashtags?: string[] | null
          id?: string
          method?: Database["public"]["Enums"]["post_method"]
          platform?: Database["public"]["Enums"]["platform"]
          topic?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_posts_brand_bundle_id_fkey"
            columns: ["brand_bundle_id"]
            isOneToOne: false
            referencedRelation: "brand_bundles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      platform: "linkedin" | "twitter" | "instagram" | "facebook"
      post_method: "coop" | "full_ai"
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
      platform: ["linkedin", "twitter", "instagram", "facebook"],
      post_method: ["coop", "full_ai"],
    },
  },
} as const
