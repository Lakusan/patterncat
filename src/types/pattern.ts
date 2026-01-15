export type Pattern = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  image: string
  gallery: string[];
  category: string;
};

export type PatternItemState = {
    patterns: Pattern[];
    setPatterns: (patterns: Pattern[]) => void;

    selectedPattern: Pattern | null;
    setSelectedPattern: (patterns: Pattern | null ) => void;

    cachedPatterns: Record<string, Pattern>;
    cachePattern: (pattern: Pattern) => void; 
};