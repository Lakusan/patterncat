import { secureStorage } from "@/src/store/SecureStorage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

console.log(">>> supabase.js LOADED");

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: Platform.OS === "web" ? undefined : secureStorage,
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
