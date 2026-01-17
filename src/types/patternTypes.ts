export type Pattern = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  image: string
  gallery: string[];
  category: string;
  updatedAt: number;
};


export type PatternItemState = {
  // --- DATA ---
  patterns: Pattern[];
  selectedPattern: Pattern | null;

  // --- SETTERS ---
  setPatterns: (patterns: Pattern[]) => void;
  setSelectedPattern: (pattern: Pattern | null) => void;

  // --- CACHE ---
  cachedPatterns: Record<string, Pattern>;
  cachePattern: (pattern: Pattern) => void;

  // --- DIRTY (unsynced) PATTERNS ---
  dirtyPatterns: Record<string, Pattern>;
  markDirty: (pattern: Pattern) => void;

  // --- SYNC TIMESTAMP ---
  lastSyncedAt: number | null;
  setLastSyncedAt: (ts: number) => void;

  // --- MERGING ---
  mergeRemotePatterns: (remote: Pattern[]) => void;

  // --- SYNC ---
  syncWithServer: () => Promise<void>;

  // --- INITIALIZATION ---
  initializeStore: () => Promise<void>;

  // --- CLEAR PERSISTENCE ---
  clearPersistance: () => Promise<void>;
};

