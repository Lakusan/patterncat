// src/services/data/PatternService.ts
// This file defines the PatternService interface, which abstracts the data operations related to patterns.
// It allows us to switch between different implementations (e.g., Supabase, REST API) without changing the rest of the app.

import type { Pattern, PatternListElement } from "@/src/types/patternTypes";

export interface PatternService {
  getAllPatternListElements(userId: string): Promise<PatternListElement[]>;
  getAllPatterns(): Promise<Pattern[]>;
  getPatternById(id: number): Promise<Pattern | null>;
  // TODO: create, update, delete, search, filter …
}
