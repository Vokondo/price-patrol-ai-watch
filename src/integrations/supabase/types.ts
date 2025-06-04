export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_settings: {
        Row: {
          alert_email: string | null
          created_at: string | null
          database_url: string | null
          email_notifications: boolean | null
          enable_proxy: boolean | null
          id: string
          max_retries: number | null
          request_delay: number | null
          scrape_frequency:
            | Database["public"]["Enums"]["monitoring_frequency"]
            | null
          slack_notifications: boolean | null
          slack_webhook: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          violation_threshold: number | null
        }
        Insert: {
          alert_email?: string | null
          created_at?: string | null
          database_url?: string | null
          email_notifications?: boolean | null
          enable_proxy?: boolean | null
          id?: string
          max_retries?: number | null
          request_delay?: number | null
          scrape_frequency?:
            | Database["public"]["Enums"]["monitoring_frequency"]
            | null
          slack_notifications?: boolean | null
          slack_webhook?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          violation_threshold?: number | null
        }
        Update: {
          alert_email?: string | null
          created_at?: string | null
          database_url?: string | null
          email_notifications?: boolean | null
          enable_proxy?: boolean | null
          id?: string
          max_retries?: number | null
          request_delay?: number | null
          scrape_frequency?:
            | Database["public"]["Enums"]["monitoring_frequency"]
            | null
          slack_notifications?: boolean | null
          slack_webhook?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          violation_threshold?: number | null
        }
        Relationships: []
      }
      price_history: {
        Row: {
          currency: string | null
          id: string
          price: number
          product_id: string | null
          raw_data: Json | null
          retailer_id: string | null
          scraped_at: string | null
        }
        Insert: {
          currency?: string | null
          id?: string
          price: number
          product_id?: string | null
          raw_data?: Json | null
          retailer_id?: string | null
          scraped_at?: string | null
        }
        Update: {
          currency?: string | null
          id?: string
          price?: number
          product_id?: string | null
          raw_data?: Json | null
          retailer_id?: string | null
          scraped_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_history_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
        ]
      }
      product_monitoring: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          monitoring_frequency:
            | Database["public"]["Enums"]["monitoring_frequency"]
            | null
          product_id: string | null
          retailer_id: string | null
          retailer_product_url: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          monitoring_frequency?:
            | Database["public"]["Enums"]["monitoring_frequency"]
            | null
          product_id?: string | null
          retailer_id?: string | null
          retailer_product_url: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          monitoring_frequency?:
            | Database["public"]["Enums"]["monitoring_frequency"]
            | null
          product_id?: string | null
          retailer_id?: string | null
          retailer_product_url?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_monitoring_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_monitoring_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          minimum_advertised_price: number | null
          msrp: number
          name: string
          sku: string | null
          updated_at: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          minimum_advertised_price?: number | null
          msrp: number
          name: string
          sku?: string | null
          updated_at?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          minimum_advertised_price?: number | null
          msrp?: number
          name?: string
          sku?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      retailers: {
        Row: {
          contact_email: string | null
          created_at: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      user_secrets: {
        Row: {
          created_at: string | null
          id: string
          secret_key: string
          secret_value: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          secret_key: string
          secret_value: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          secret_key?: string
          secret_value?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      violations: {
        Row: {
          advertised_price: number
          created_at: string | null
          detected_at: string | null
          difference_amount: number
          difference_percentage: number
          id: string
          minimum_price: number
          notes: string | null
          product_id: string | null
          resolved_at: string | null
          retailer_id: string | null
          status: Database["public"]["Enums"]["violation_status"] | null
          updated_at: string | null
          violation_type: string
        }
        Insert: {
          advertised_price: number
          created_at?: string | null
          detected_at?: string | null
          difference_amount: number
          difference_percentage: number
          id?: string
          minimum_price: number
          notes?: string | null
          product_id?: string | null
          resolved_at?: string | null
          retailer_id?: string | null
          status?: Database["public"]["Enums"]["violation_status"] | null
          updated_at?: string | null
          violation_type: string
        }
        Update: {
          advertised_price?: number
          created_at?: string | null
          detected_at?: string | null
          difference_amount?: number
          difference_percentage?: number
          id?: string
          minimum_price?: number
          notes?: string | null
          product_id?: string | null
          resolved_at?: string | null
          retailer_id?: string | null
          status?: Database["public"]["Enums"]["violation_status"] | null
          updated_at?: string | null
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "violations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "violations_retailer_id_fkey"
            columns: ["retailer_id"]
            isOneToOne: false
            referencedRelation: "retailers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      monitoring_frequency: "hourly" | "daily" | "weekly"
      violation_status: "active" | "resolved" | "investigating"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      monitoring_frequency: ["hourly", "daily", "weekly"],
      violation_status: ["active", "resolved", "investigating"],
    },
  },
} as const
