import type { Pattern, RawPattern } from "@/src/types/patternTypes";

export interface PatternService {
  getAll(): Promise<Pattern[]>;
  getAllRaw(): Promise<RawPattern[]>;
  getById(id: number): Promise<Pattern | null>;
  // später: create, update, delete, search, filter …
}
