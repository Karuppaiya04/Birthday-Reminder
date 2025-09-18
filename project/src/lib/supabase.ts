import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jswbyckmsdqvixezpaqe.supabase.co' || 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2J5Y2ttc2Rxdml4ZXpwYXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxOTkxODMsImV4cCI6MjA3Mzc3NTE4M30.zi-fBxCUNDQrfWAfMM08LRDGCz2gBeZkX9sHzn9KTlk' || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      birthdays: {
        Row: {
          id: string
          user_id: string
          name: string
          date_of_birth: string
          relation: string
          notes: string | null
          profile_picture_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          date_of_birth: string
          relation: string
          notes?: string | null
          profile_picture_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          date_of_birth?: string
          relation?: string
          notes?: string | null
          profile_picture_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}