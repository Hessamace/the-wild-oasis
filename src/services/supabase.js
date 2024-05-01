import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pydwbgumzlilucawgdct.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZHdiZ3VtemxpbHVjYXdnZGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMzQ2NTgsImV4cCI6MjAyOTkxMDY1OH0.xYQjHcc2uFbsO9OY6DN5oHDewaosvO-SfaDVyI7TYFw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
