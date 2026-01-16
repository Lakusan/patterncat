import { supabase } from "@/src/lib/supabase";

export type Metadata = {
  categories: string[];
  // later: tags: string[];
  // later: difficultyLevels: string[];
};

export const metadataRepository = {
  /**
   * Load metadata from DB or dev source
   */
  async getMetadata(): Promise<Metadata> {
    if (__DEV__) {
      // In dev mode, return static metadata
      return {
        categories: ["Alle", "Kleider", "Hosen", "Oberteile", "Jacken"],
      };
    }

    // In production, load from Supabase
    const { data, error } = await supabase
      .from("metadata")
      .select("*")
      .single();

    if (error) {
      console.error("metadataRepository.getMetadata error:", error);
      throw error;
    }

    return {
      categories: data.categories ?? [],
    };
  },

  /**
   * Save metadata (admin use, optional)
   */
  async updateMetadata(metadata: Metadata): Promise<void> {
    if (__DEV__) {
      console.log("DEV: skipping metadata update", metadata);
      return;
    }

    const { error } = await supabase
      .from("metadata")
      .update(metadata)
      .eq("id", 1); // assuming single metadata row

    if (error) {
      console.error("metadataRepository.updateMetadata error:", error);
      throw error;
    }
  },
};
