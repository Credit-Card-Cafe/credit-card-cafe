import { createClient } from "@supabase/supabase-js";
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpneWxya29odXpjdGdkZHB1Z2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMTE5NjcsImV4cCI6MjA0Nzc4Nzk2N30.Gdcu_j-VFW6gZHZ3c_s5PRbOD7FQD9tuTpkCndGMibU";
const supabase_url = "https://jgylrkohuzctgddpuglf.supabase.co";
const supabase = createClient(supabase_url, supabase_key);
export {
  supabase as s
};
