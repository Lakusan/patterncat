export type RawPattern = {
  id: string;
  name: string;
  format: number | null;
  groessenspektrum: number | null;
  art: number | null;
  kategorie_1: number | null;
  kategorie_2: number | null;
  anlass: number | null;
  beschreibung: string | null;
  aermel: number | null;
  saumlaenge: number | null;
  verschluss: number | null;
  ausschnitt: number | null;
  quelle_marke: number | null;
  magazin_monat: number | null;
  magazin_jahr: number | null;
  nummer_bezeichnung: string | null;
  datum: string | null;
  elastische_stoffe: boolean;
  bild_linienzeichnung: string | null;
  bereits_genaeht: boolean;
  jahreszeit: number | null;
  schwierigkeitsgrad: number | null;
  stoffmenge_cm: number | null;
  user_id: string | null;
};

export type Pattern = {
  id: string;
  ownerId: string | null;

  title: string;
  description: string | null;

  image: string | null;      
  gallery: string[];         

  category: string | null;   

  updatedAt: number | null;  
};

export function mapRawPatternToPattern(raw: RawPattern): Pattern {
  return {
    id: raw.id,
    ownerId: raw.user_id,

    title: raw.name,
    description: raw.beschreibung,

    image: raw.bild_linienzeichnung, // später: signed URL
    gallery: [], // kommt später aus images-Tabelle

    category: raw.kategorie_1?.toString() ?? null,

    updatedAt: raw.datum ? new Date(raw.datum).getTime() : null,
  };
}


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

