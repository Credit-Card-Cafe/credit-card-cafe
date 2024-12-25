// src/lib/server/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'
const supabase_key = import.meta.env.VITE_SUPABASE_KEY;
const supabase_url = import.meta.env.VITE_SUPABASE_URL 

if (!supabase_url || !supabase_key) {
  throw new Error('Supabase environment variables are missing');
}

export const supabase = createClient<Database>(supabase_url, supabase_key)

