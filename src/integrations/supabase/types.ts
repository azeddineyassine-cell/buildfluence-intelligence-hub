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
      ip_actors: {
        Row: {
          acronym: string | null
          actor_id: string
          actor_type: string
          canonical_name_ar: string | null
          canonical_name_fr: string
          created_at: string
          current_role_fr: string | null
          monitoring_status: string | null
          party_id: string | null
          public_display_status: string | null
          rank_scope: number | null
          source_ids: string | null
          updated_at: string
          verification_status: string | null
        }
        Insert: {
          acronym?: string | null
          actor_id: string
          actor_type: string
          canonical_name_ar?: string | null
          canonical_name_fr: string
          created_at?: string
          current_role_fr?: string | null
          monitoring_status?: string | null
          party_id?: string | null
          public_display_status?: string | null
          rank_scope?: number | null
          source_ids?: string | null
          updated_at?: string
          verification_status?: string | null
        }
        Update: {
          acronym?: string | null
          actor_id?: string
          actor_type?: string
          canonical_name_ar?: string | null
          canonical_name_fr?: string
          created_at?: string
          current_role_fr?: string | null
          monitoring_status?: string | null
          party_id?: string | null
          public_display_status?: string | null
          rank_scope?: number | null
          source_ids?: string | null
          updated_at?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_actors_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "ip_actors"
            referencedColumns: ["actor_id"]
          },
          {
            foreignKeyName: "ip_actors_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "v_ip_actor_ranking"
            referencedColumns: ["actor_id"]
          },
        ]
      }
      ip_mention_actors: {
        Row: {
          actor_id: string
          actor_type: string
          alias_id: string | null
          alias_used: string | null
          canonical_name: string
          confidence: number
          context_result: string | null
          context_rule: string | null
          human_decision: string | null
          match_field: string | null
          mention_id: number
          priority: number | null
          review_status: string
          reviewed_at: string | null
        }
        Insert: {
          actor_id: string
          actor_type: string
          alias_id?: string | null
          alias_used?: string | null
          canonical_name: string
          confidence: number
          context_result?: string | null
          context_rule?: string | null
          human_decision?: string | null
          match_field?: string | null
          mention_id: number
          priority?: number | null
          review_status: string
          reviewed_at?: string | null
        }
        Update: {
          actor_id?: string
          actor_type?: string
          alias_id?: string | null
          alias_used?: string | null
          canonical_name?: string
          confidence?: number
          context_result?: string | null
          context_rule?: string | null
          human_decision?: string | null
          match_field?: string | null
          mention_id?: number
          priority?: number | null
          review_status?: string
          reviewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_mention_actors_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "ip_actors"
            referencedColumns: ["actor_id"]
          },
          {
            foreignKeyName: "ip_mention_actors_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "v_ip_actor_ranking"
            referencedColumns: ["actor_id"]
          },
          {
            foreignKeyName: "ip_mention_actors_mention_id_fkey"
            columns: ["mention_id"]
            isOneToOne: false
            referencedRelation: "ip_mentions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ip_mention_actors_mention_id_fkey"
            columns: ["mention_id"]
            isOneToOne: false
            referencedRelation: "v_ip_recent_mentions"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_mentions: {
        Row: {
          actor_count: number
          alert_id: number | null
          alert_name: string | null
          country: string | null
          cumulative_reach: number | null
          description: string | null
          direct_party_ids: string | null
          direct_reach: number | null
          domain_reach: number | null
          id: number
          imported_at: string
          inferred_party_ids: string | null
          language: string | null
          matched_actor_ids: string | null
          max_confidence: number
          personality_ids: string | null
          published_at: string | null
          review_status: string
          score: number | null
          source_name: string | null
          source_type: string | null
          source_url: string | null
          tags: string | null
          title: string | null
          tone: string | null
          url: string | null
        }
        Insert: {
          actor_count?: number
          alert_id?: number | null
          alert_name?: string | null
          country?: string | null
          cumulative_reach?: number | null
          description?: string | null
          direct_party_ids?: string | null
          direct_reach?: number | null
          domain_reach?: number | null
          id: number
          imported_at?: string
          inferred_party_ids?: string | null
          language?: string | null
          matched_actor_ids?: string | null
          max_confidence?: number
          personality_ids?: string | null
          published_at?: string | null
          review_status: string
          score?: number | null
          source_name?: string | null
          source_type?: string | null
          source_url?: string | null
          tags?: string | null
          title?: string | null
          tone?: string | null
          url?: string | null
        }
        Update: {
          actor_count?: number
          alert_id?: number | null
          alert_name?: string | null
          country?: string | null
          cumulative_reach?: number | null
          description?: string | null
          direct_party_ids?: string | null
          direct_reach?: number | null
          domain_reach?: number | null
          id?: number
          imported_at?: string
          inferred_party_ids?: string | null
          language?: string | null
          matched_actor_ids?: string | null
          max_confidence?: number
          personality_ids?: string | null
          published_at?: string | null
          review_status?: string
          score?: number | null
          source_name?: string | null
          source_type?: string | null
          source_url?: string | null
          tags?: string | null
          title?: string | null
          tone?: string | null
          url?: string | null
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
      v_ip_actor_ranking: {
        Row: {
          acronym: string | null
          actor_id: string | null
          actor_type: string | null
          avg_match_confidence: number | null
          canonical_name_ar: string | null
          canonical_name_fr: string | null
          current_role_fr: string | null
          direct_reach: number | null
          latest_mention_at: string | null
          mention_count: number | null
          negative_count: number | null
          neutral_count: number | null
          party_id: string | null
          positive_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_actors_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "ip_actors"
            referencedColumns: ["actor_id"]
          },
          {
            foreignKeyName: "ip_actors_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "v_ip_actor_ranking"
            referencedColumns: ["actor_id"]
          },
        ]
      }
      v_ip_kpis: {
        Row: {
          dataset_imported_at: string | null
          document_count: number | null
          documents_24h: number | null
          freshest_publication_at: string | null
          mentions_pending_review: number | null
          source_count: number | null
        }
        Relationships: []
      }
      v_ip_recent_mentions: {
        Row: {
          actor_id: string | null
          canonical_name_fr: string | null
          confidence: number | null
          country: string | null
          id: number | null
          language: string | null
          published_at: string | null
          source_name: string | null
          source_type: string | null
          title: string | null
          tone: string | null
          url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_mention_actors_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "ip_actors"
            referencedColumns: ["actor_id"]
          },
          {
            foreignKeyName: "ip_mention_actors_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "v_ip_actor_ranking"
            referencedColumns: ["actor_id"]
          },
        ]
      }
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
