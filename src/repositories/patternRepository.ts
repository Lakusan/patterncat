import { supabase } from '@/src/lib/supabase';
import { Pattern } from '@/src/types/pattern';
import { CATEGORIES, NUM_TESTOBJECTS } from '../constants/dev';



// DEV 
// returns a random category for a generated Pattern
function getRandomCategory(): string {
  const index = Math.floor(Math.random() * CATEGORIES.length);
  return CATEGORIES[index];
}

// generates Testing Data for
function generateTestPatterns(count: number, ownerId = "test-user"): Pattern[] {
  const now = Date.now();

  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    ownerId,
    title: `Muster ${i + 1}`,
    description: `Dies ist eine Beschreibung für Muster ${i + 1}.`,
    image: `https://picsum.photos/seed/pattern-${i + 1}/300/200`,
    gallery: Array.from({ length: 5 }, (_, j) =>
      `https://picsum.photos/seed/pattern-${i + 1}-${j + 1}/300/200`
    ),
    category: getRandomCategory(),
    updatedAt: now,
  }));
}

// Data I/O
export const patternRepository = {
  // pattern loading: DEV: Generator; PROD: supabase
  async getAll(ownerId?: string): Promise<Pattern[]> {
    if (__DEV__) {
      console.log("DEV MODE - Generate Patterns")
      if(NUM_TESTOBJECTS == 0) {
        console.log("TEST OBJECTS 0 - WOULD ASK SUPABASE FOR DATA")
      }
      return generateTestPatterns(NUM_TESTOBJECTS, ownerId ?? "test-user");
    }

    const query = supabase.from("patterns").select("*");
    console.error(query)

    if (ownerId) {
      query.eq("owner_id", ownerId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("patternRepository.getAll error:", error);
      throw error;
    }

    return (data ?? []) as Pattern[];
  },

  // Upsert = Update or insert Record
  async upsert(patterns: Pattern | Pattern[]): Promise<void> {
    const list = Array.isArray(patterns) ? patterns : [patterns];

    if (__DEV__) {
      // In dev, you might skip or log instead of hitting DB
      console.log("DEV upsert patterns:", list.length);
      return;
    }

    const { error } = await supabase.from("patterns").upsert(list);

    if (error) {
      console.error("patternRepository.upsert error:", error);
      throw error;
    }
  },

  /** Delete a pattern by id */
  async delete(id: string): Promise<void> {
    if (__DEV__) {
      console.log("DEV delete pattern:", id);
      return;
    }

    const { error } = await supabase.from("patterns").delete().eq("id", id);

    if (error) {
      console.error("patternRepository.delete error:", error);
      throw error;
    }
  },

  generateTestPatterns,
};
