// src/services/patternService.supabase.ts
// This file implements the PatternService interface using Supabase as the backend.

import { supabase } from "@/src/lib/supabase";
import { PatternService } from "@/src/services/data/PatternService";
import { Pattern, PatternListElement } from "@/src/types/patternTypes";

export const supabasePatternService: PatternService = {
  // List Elements: Only Data needed for listing patterns for a ownig user (session UserId)
  async getAllPatternListElements(
    userId: string,
  ): Promise<PatternListElement[]> {
    const { data, error } = await supabase
      .from("patterns")
      .select(
        `
          id,
          name,
          beschreibung,
          art,
          datum,
          images (
            id,
            path
          )
        `,
      )
      .eq("user_id", userId);

    if (error) throw error;

    return (data ?? []).map((raw) => ({
      id: raw.id,
      name: raw.name,
      description: raw.beschreibung,
      image: raw.images?.[0]?.path ?? null,
      category: raw.art,
      updatedAt: raw.datum,
    }));
  },

  // All Data of Patterns
  async getAllPatterns(): Promise<Pattern[]> {
    return [];
  },

  // Details View Data of a specific pattern
  async getPatternById(id: number): Promise<Pattern | null> {
    return null;
  },
};
