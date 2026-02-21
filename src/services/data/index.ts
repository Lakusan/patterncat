// src/services/data/index.ts
// Switch between different implementations of the PatternService (e.g., Supabase, REST API) by changing the export here.
export { supabasePatternService as patternService } from "@/src/services/data/SupabasePatternService";

