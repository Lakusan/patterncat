import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { unifiedSecureStorage } from "./storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase env vars are missing");
}

const SupabaseStorageAdapter = {
  getItem: (key: string) => unifiedSecureStorage.getItem(key),
  setItem: (key: string, value: string) => unifiedSecureStorage.setItem(key, value),
  removeItem: (key: string) => unifiedSecureStorage.removeItem(key),
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: SupabaseStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
