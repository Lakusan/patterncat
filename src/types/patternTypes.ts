export type Pattern = {
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

// Pattern type Flatlist Home
// Data: patternID, title, description, mainImage, category

export type PatternListElement = {
  id: string;

  name: string;
  description: string | null;

  image: string | null;

  category: string | null;

  updatedAt: number | null;
};
