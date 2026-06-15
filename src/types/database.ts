export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          role: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          role?: string;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          role?: string;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      modules: {
        Row: {
          id: string;
          slug: string;
          title: Json;
          summary: Json;
          description: Json;
          icon: string;
          accent: string;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["modules"]["Row"]> & {
          slug: string;
          title: Json;
          summary: Json;
          description: Json;
        };
        Update: Partial<Database["public"]["Tables"]["modules"]["Row"]>;
        Relationships: [];
      };
      module_features: {
        Row: {
          id: string;
          module_id: string;
          title: Json;
          description: Json;
          badge: string;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["module_features"]["Row"]> & {
          module_id: string;
          title: Json;
          description: Json;
        };
        Update: Partial<Database["public"]["Tables"]["module_features"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "module_features_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          }
        ];
      };
      showcase_items: {
        Row: {
          id: string;
          type: string;
          title: Json;
          summary: Json;
          metric_label: Json;
          metric_value: string;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["showcase_items"]["Row"]> & {
          type: string;
          title: Json;
          summary: Json;
        };
        Update: Partial<Database["public"]["Tables"]["showcase_items"]["Row"]>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: Json;
          quote: Json;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & {
          name: string;
          role: Json;
          quote: Json;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question: Json;
          answer: Json;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["faqs"]["Row"]> & {
          question: Json;
          answer: Json;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Row"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          id: string;
          actor_id: string | null;
          actor_email: string | null;
          action: string;
          entity: string;
          entity_id: string | null;
          payload: Json;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["audit_log"]["Row"]> & {
          action: string;
          entity: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
