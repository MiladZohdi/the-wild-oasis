import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bcmkaaxewzqqlpvwsmpz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbWthYXhld3pxcWxwdndzbXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTU3MjMsImV4cCI6MjA1NTQ3MTcyM30.xj6kHDQLLd9D4ycaxI49X04Vx23FQZCCnR7_vfVkt2c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
