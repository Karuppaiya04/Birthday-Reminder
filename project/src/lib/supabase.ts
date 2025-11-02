import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = 'https://jswbyckmsdqvixezpaqe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd2J5Y2ttc2Rxdml4ZXpwYXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxOTkxODMsImV4cCI6MjA3Mzc3NTE4M30.zi-fBxCUNDQrfWAfMM08LRDGCz2gBeZkX9sHzn9KTlk'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)