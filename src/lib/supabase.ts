import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Supabase URL MUST be a valid URL string starting with http or https.
const isUrlValid = rawUrl.startsWith('http')
const supabaseUrl = isUrlValid ? rawUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = rawKey || 'placeholder'

if (!isUrlValid || rawUrl === 'your_supabase_url') {
    console.warn('⚠️ Invalid or missing Supabase URL in .env.local. Please provide your real project URL (e.g., https://xyz.supabase.co).')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
