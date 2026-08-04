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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      access_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          langue: string
          message: string | null
          name: string
          organization: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          langue?: string
          message?: string | null
          name: string
          organization?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          langue?: string
          message?: string | null
          name?: string
          organization?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          form_type: string
          id: string
          message: string | null
          name: string
          organization: string | null
          phone: string | null
          platform: string | null
          position: string | null
          priority: string | null
          situation: string | null
          topic: string | null
        }
        Insert: {
          created_at?: string
          email: string
          form_type: string
          id?: string
          message?: string | null
          name: string
          organization?: string | null
          phone?: string | null
          platform?: string | null
          position?: string | null
          priority?: string | null
          situation?: string | null
          topic?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          form_type?: string
          id?: string
          message?: string | null
          name?: string
          organization?: string | null
          phone?: string | null
          platform?: string | null
          position?: string | null
          priority?: string | null
          situation?: string | null
          topic?: string | null
        }
        Relationships: []
      }
      content_analysis: {
        Row: {
          id: string
          parties_mentionnees: Json
          processed_at: string
          raw_content_id: string
          score_pertinence: number | null
          theme: string | null
          tonalite: string | null
        }
        Insert: {
          id?: string
          parties_mentionnees?: Json
          processed_at?: string
          raw_content_id: string
          score_pertinence?: number | null
          theme?: string | null
          tonalite?: string | null
        }
        Update: {
          id?: string
          parties_mentionnees?: Json
          processed_at?: string
          raw_content_id?: string
          score_pertinence?: number | null
          theme?: string | null
          tonalite?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_analysis_raw_content_id_fkey"
            columns: ["raw_content_id"]
            isOneToOne: false
            referencedRelation: "raw_content"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_requests: {
        Row: {
          created_at: string
          id: string
          note: string | null
          requested_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      isd_responses: {
        Row: {
          appro: Json | null
          approfondissement: boolean
          commentaire_ouvert: string | null
          contact_email: string | null
          contact_fonction: string | null
          contact_nom: string | null
          contact_organisation: string | null
          contact_telephone: string | null
          created_at: string
          dd_cabinet_origine: string | null
          dd_realisation: string | null
          fonction: string | null
          id: string
          niveau: string | null
          outil_carto: string[] | null
          outil_crise: string[] | null
          outil_donnee: string[] | null
          outil_signaux: string[] | null
          precisions: Json | null
          q1: number | null
          q10: number | null
          q11: number | null
          q12: number | null
          q2: number | null
          q3: number | null
          q4: number | null
          q5: number | null
          q6: number | null
          q7: number | null
          q8: number | null
          q9: number | null
          score_global: number | null
          score_p1: number | null
          score_p2: number | null
          score_p3: number | null
          score_p4: number | null
          secteur: string | null
          type_organisation: string | null
          veille_capitalisation: string[] | null
          veille_externalisation_origine: string | null
          veille_organisation: string | null
          veille_outil: string | null
          veille_outil_precision: string | null
          veille_prestataire_origine: string | null
          veille_thematiques: string[] | null
        }
        Insert: {
          appro?: Json | null
          approfondissement?: boolean
          commentaire_ouvert?: string | null
          contact_email?: string | null
          contact_fonction?: string | null
          contact_nom?: string | null
          contact_organisation?: string | null
          contact_telephone?: string | null
          created_at?: string
          dd_cabinet_origine?: string | null
          dd_realisation?: string | null
          fonction?: string | null
          id?: string
          niveau?: string | null
          outil_carto?: string[] | null
          outil_crise?: string[] | null
          outil_donnee?: string[] | null
          outil_signaux?: string[] | null
          precisions?: Json | null
          q1?: number | null
          q10?: number | null
          q11?: number | null
          q12?: number | null
          q2?: number | null
          q3?: number | null
          q4?: number | null
          q5?: number | null
          q6?: number | null
          q7?: number | null
          q8?: number | null
          q9?: number | null
          score_global?: number | null
          score_p1?: number | null
          score_p2?: number | null
          score_p3?: number | null
          score_p4?: number | null
          secteur?: string | null
          type_organisation?: string | null
          veille_capitalisation?: string[] | null
          veille_externalisation_origine?: string | null
          veille_organisation?: string | null
          veille_outil?: string | null
          veille_outil_precision?: string | null
          veille_prestataire_origine?: string | null
          veille_thematiques?: string[] | null
        }
        Update: {
          appro?: Json | null
          approfondissement?: boolean
          commentaire_ouvert?: string | null
          contact_email?: string | null
          contact_fonction?: string | null
          contact_nom?: string | null
          contact_organisation?: string | null
          contact_telephone?: string | null
          created_at?: string
          dd_cabinet_origine?: string | null
          dd_realisation?: string | null
          fonction?: string | null
          id?: string
          niveau?: string | null
          outil_carto?: string[] | null
          outil_crise?: string[] | null
          outil_donnee?: string[] | null
          outil_signaux?: string[] | null
          precisions?: Json | null
          q1?: number | null
          q10?: number | null
          q11?: number | null
          q12?: number | null
          q2?: number | null
          q3?: number | null
          q4?: number | null
          q5?: number | null
          q6?: number | null
          q7?: number | null
          q8?: number | null
          q9?: number | null
          score_global?: number | null
          score_p1?: number | null
          score_p2?: number | null
          score_p3?: number | null
          score_p4?: number | null
          secteur?: string | null
          type_organisation?: string | null
          veille_capitalisation?: string[] | null
          veille_externalisation_origine?: string | null
          veille_organisation?: string | null
          veille_outil?: string | null
          veille_outil_precision?: string | null
          veille_prestataire_origine?: string | null
          veille_thematiques?: string[] | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          langue: string
          message: string | null
          nom: string | null
          prenom: string | null
          statut: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          langue?: string
          message?: string | null
          nom?: string | null
          prenom?: string | null
          statut?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          langue?: string
          message?: string | null
          nom?: string | null
          prenom?: string | null
          statut?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      raw_content: {
        Row: {
          collected_at: string
          id: string
          processed: boolean
          published_at: string | null
          raw_text: string | null
          source_id: string
          title: string | null
          url: string
        }
        Insert: {
          collected_at?: string
          id?: string
          processed?: boolean
          published_at?: string | null
          raw_text?: string | null
          source_id: string
          title?: string | null
          url: string
        }
        Update: {
          collected_at?: string
          id?: string
          processed?: boolean
          published_at?: string | null
          raw_text?: string | null
          source_id?: string
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "raw_content_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          id: string
          name: string
          type: string
          url: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          id?: string
          name: string
          type?: string
          url: string
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          id?: string
          name?: string
          type?: string
          url?: string
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
      app_role: "public" | "registered" | "premium"
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
      app_role: ["public", "registered", "premium"],
    },
  },
} as const
