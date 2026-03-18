// Full Pattern for Details View | Edit | Insert
export type Pattern = {
  id: number;
  name: string;

  // Lookup-Felder als Strings
  format: string | null;
  groessenspektrum: string | null;
  art: string | null;
  kategorie_1: string | null;
  kategorie_2: string | null;
  anlass: string | null;

  beschreibung: string;

  aermel: string | null;
  saumlaenge: string | null;
  verschluss: string | null;
  ausschnitt: string | null;

  // Quelle hat zwei Felder
  quelle_marke: string | null;
  quelle_type: string | null;

  magazin_monat: number | null;
  magazin_jahr: number | null;
  nummer_bezeichnung: string | null;
  datum: string | null;

  elastische_stoffe: boolean;
  bild_linienzeichnung: string | null;
  bereits_genaeht: boolean;

  jahreszeit: string | null;
  schwierigkeitsgrad: string | null;

  stoffmenge_cm: number | null;
  user_id: string | null;

  // Images bleiben Objekte
  images: {
    id: number;
    url: string;
    titel: string | null;
    beschreibung: string | null;
    dateiname: string | null;
    content_type: string | null;
    ismainimage: boolean | null;
  }[];

  // Materials als String-Array
  materials: string[];

  // Tags als String-Array
  tags: string[];
};

export type PatternImage = {
    id: number;
    path: string;
    titel: string | null;
    beschreibung: string | null;
    dateiname: string | null;
    content_type: string | null;
    ismainimage: boolean | null;
    ownerId: string | null;
    pattern_id: number;
    ["Erstellt am"]?: string;
}

// Pattern type PatternList -> reduced Information for PatterList
// Data: patternID, title, description, mainImage, category

export type PatternListElement = {
  id: string;

  name: string;
  description: string | null;

  image: string | null;

  category: string | null;

  updatedAt: number | null;
};
