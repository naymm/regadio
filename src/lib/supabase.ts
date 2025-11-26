import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Tipos TypeScript para o banco de dados
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "admin" | "editor" | "viewer";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role?: "admin" | "editor" | "viewer";
        };
        Update: {
          email?: string;
          name?: string;
          role?: "admin" | "editor" | "viewer";
        };
      };
      news: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          content: string;
          image_url: string | null;
          category: string | null;
          author: string | null;
          date: string;
          tags: string[];
          status: "draft" | "published" | "archived";
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          content: string;
          image_url?: string | null;
          category?: string | null;
          author?: string | null;
          date: string;
          tags?: string[];
          status?: "draft" | "published" | "archived";
          created_by?: string | null;
        };
        Update: {
          slug?: string;
          title?: string;
          description?: string;
          content?: string;
          image_url?: string | null;
          category?: string | null;
          author?: string | null;
          date?: string;
          tags?: string[];
          status?: "draft" | "published" | "archived";
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          description: string;
          location: string | null;
          project_status: string | null;
          year: string | null;
          scope: string | null;
          image_url: string | null;
          status: "draft" | "published" | "archived";
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: string;
          description: string;
          location?: string | null;
          status?: string | null;
          year?: string | null;
          scope?: string | null;
          image_url?: string | null;
          status?: "draft" | "published" | "archived";
          created_by?: string | null;
        };
        Update: {
          slug?: string;
          title?: string;
          category?: string;
          description?: string;
          location?: string | null;
          status?: string | null;
          year?: string | null;
          scope?: string | null;
          image_url?: string | null;
          status?: "draft" | "published" | "archived";
        };
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          image_url: string;
          order_index?: number;
        };
        Update: {
          image_url?: string;
          order_index?: number;
        };
      };
    };
  };
};

