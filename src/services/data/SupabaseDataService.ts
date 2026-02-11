import { supabase } from "@/src/lib/supabase";
import { DataService } from "@/src/services/data/DataService";

export const supabaseDataService: DataService = {
  async getUserProfile(id: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", id)
      .maybeSingle(); // besser als .single()

    if (error) {
      console.error("Supabase error:", error);
      return null;
    }

    return data;
  }
};
