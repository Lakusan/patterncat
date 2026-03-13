// src/services/data/PatternService.ts
// This file defines the PatternService interface, which abstracts the data operations related to patterns.
// It allows us to switch between different implementations (e.g., Supabase, REST API) without changing the rest of the app.

import type { Pattern, PatternListElement } from "@/src/types/patternTypes";

export interface PatternService {
  getAllPatternListElements(userId: string): Promise<PatternListElement[]>;

  getAllPatterns(userId: string): Promise<Pattern[]>;

  getPatternById(id: string, userId: string): Promise<Pattern | null>;

  createPattern(
    data: Omit<Pattern, "id" | "user_id">,
    userId: string
  ): Promise<Pattern>;

  updatePattern(
    id: string,
    data: Partial<Omit<Pattern, "id" | "user_id">>,
    userId: string
  ): Promise<Pattern>;

  deletePattern(id: string, userId: string): Promise<void>;
}

