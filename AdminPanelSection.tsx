import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "https://placeholder-url.supabase.co";
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "placeholder-key";

export const isSupabaseConfigured = 
  !!import.meta.env.VITE_SUPABASE_URL && 
  !!import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!isSupabaseConfigured) {
  console.warn("WARNING: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Supabase integration is disabled.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
