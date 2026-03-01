export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      restaurant_settings: {
        Row: {
          id: number
          name: string
          motto: string
          hours: string
          address: string
          phone: string
          messenger: string
          instagram: string
          tiktok: string
          email: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          motto: string
          hours: string
          address: string
          phone: string
          messenger: string
          instagram: string
          tiktok: string
          email: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          motto?: string
          hours?: string
          address?: string
          phone?: string
          messenger?: string
          instagram?: string
          tiktok?: string
          email?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          image_url: string | null
          is_featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          image_url?: string | null
          is_featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          image_url?: string | null
          is_featured?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
