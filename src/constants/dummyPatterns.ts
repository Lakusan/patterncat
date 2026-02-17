export interface Pattern {
  id: string;
  name: string;
  beschreibung: string | null;
  nummer_bezeichnung: string | null;
  datum: string | null;
  elastische_stoffe: boolean;
  bereits_genaeht: boolean;
  stoffmenge_cm: number | null;

  format: {
    id: number;
    name: string;
  } | null;

  groessenspektrum: {
    id: number;
    value: string;
  } | null;

  art: {
    id: number;
    name: string;
  } | null;

  kategorie_1: {
    id: number;
    value: string | null;
  } | null;

  kategorie_2: {
    id: number;
    value: string | null;
    kategorie_1?: number | null;
  } | null;

  anlass: {
    id: number;
    value: string;
  } | null;

  aermel: {
    id: number;
    value: string;
  } | null;

  saumlaenge: {
    id: number;
    value: string | null;
  } | null;

  verschluss: {
    id: number;
    value: string | null;
  } | null;

  ausschnitt: {
    id: number;
    value: string | null;
  } | null;

  jahrezeit: {
    id: number;
    name: string;
  } | null;

  schwierigkeitsgrad: {
    id: number;
    value: string;
  } | null;

  quelle_marke: {
    id: number;
    name: string;
    type: string | null;
  } | null;

  user: {
    id: string;
    username: string | null;
  } | null;

  pattern_materials: {
    materials: {
      id: number;
      material_name: string | null;
    };
  }[];

  pattern_tags: {
    tags: {
      id: number;
      tag_name: string;
    };
  }[];

  images: {
    id: number;
    titel: string | null;
    beschreibung: string | null;
    dateiname: string | undefined;
    content_type: string | null;
    ismainimage: boolean | null;
  }[];
}


export const publicPatterns: Pattern[] = [
  {
    id: "1",
    name: "Sommerkleid Anna",
    beschreibung: "Ein luftiges Sommerkleid mit ausgestelltem Rock.",
    nummer_bezeichnung: "Modell 102A",
    datum: "2024-06-15T00:00:00.000Z",
    elastische_stoffe: false,
    bereits_genaeht: true,
    stoffmenge_cm: 180,
    format: { id: 1, name: "PDF" },
    groessenspektrum: { id: 2, value: "34–46" },
    art: { id: 1, name: "Kleid" },
    kategorie_1: { id: 1, value: "Damen" },
    kategorie_2: { id: 3, value: "Sommerkleid", kategorie_1: 1 },
    anlass: { id: 1, value: "Freizeit" },
    aermel: { id: 2, value: "Kurzarm" },
    saumlaenge: { id: 1, value: "Knielang" },
    verschluss: { id: 1, value: "Reißverschluss" },
    ausschnitt: { id: 1, value: "V-Ausschnitt" },
    jahrezeit: { id: 1, name: "Sommer" },
    schwierigkeitsgrad: { id: 2, value: "Mittel" },
    quelle_marke: { id: 1, name: "Burda", type: "Magazin" },
    user: { id: "u1", username: "anna" },
    pattern_materials: [
      { materials: { id: 1, material_name: "Baumwolle" } },
      { materials: { id: 2, material_name: "Viskose" } }
    ],
    pattern_tags: [
      { tags: { id: 1, tag_name: "Sommer" } },
      { tags: { id: 2, tag_name: "Einfach" } }
    ],
    images: [
      {
        id: 1,
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=101",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ]
  },

  {
    id: "2",
    name: "Hoodie Max",
    beschreibung: "Bequemer Hoodie mit Kapuze und Kängurutasche.",
    nummer_bezeichnung: "HM-204",
    datum: "2023-10-01T00:00:00.000Z",
    elastische_stoffe: true,
    bereits_genaeht: false,
    stoffmenge_cm: 220,
    format: { id: 1, name: "PDF" },
    groessenspektrum: { id: 3, value: "S–XXL" },
    art: { id: 2, name: "Hoodie" },
    kategorie_1: { id: 2, value: "Herren" },
    kategorie_2: { id: 4, value: "Pullover", kategorie_1: 2 },
    anlass: { id: 2, value: "Casual" },
    aermel: { id: 3, value: "Langarm" },
    saumlaenge: { id: 2, value: "Hüftlang" },
    verschluss: { id: 2, value: "Ohne" },
    ausschnitt: { id: 3, value: "Rundhals" },
    jahrezeit: { id: 2, name: "Herbst" },
    schwierigkeitsgrad: { id: 3, value: "Fortgeschritten" },
    quelle_marke: { id: 2, name: "Simplicity", type: "Schnittmuster" },
    user: { id: "u2", username: "max" },
    pattern_materials: [
      { materials: { id: 3, material_name: "Sweatstoff" } }
    ],
    pattern_tags: [
      { tags: { id: 3, tag_name: "Casual" } }
    ],
    images: []
  },

  {
    id: "3",
    name: "Wintermantel Clara",
    beschreibung: "Eleganter Mantel mit Taillengürtel.",
    nummer_bezeichnung: "WM-501",
    datum: "2022-12-01T00:00:00.000Z",
    elastische_stoffe: false,
    bereits_genaeht: false,
    stoffmenge_cm: 350,
    format: { id: 2, name: "Papierschnitt" },
    groessenspektrum: { id: 4, value: "36–50" },
    art: { id: 3, name: "Mantel" },
    kategorie_1: { id: 1, value: "Damen" },
    kategorie_2: { id: 5, value: "Wintermantel", kategorie_1: 1 },
    anlass: { id: 3, value: "Elegant" },
    aermel: { id: 3, value: "Langarm" },
    saumlaenge: { id: 3, value: "Wadenlang" },
    verschluss: { id: 3, value: "Knöpfe" },
    ausschnitt: { id: 4, value: "Stehkragen" },
    jahrezeit: { id: 3, name: "Winter" },
    schwierigkeitsgrad: { id: 4, value: "Schwierig" },
    quelle_marke: { id: 3, name: "Vogue", type: "Designer" },
    user: { id: "u3", username: "clara" },
    pattern_materials: [
      { materials: { id: 4, material_name: "Wolle" } }
    ],
    pattern_tags: [
      { tags: { id: 4, tag_name: "Winter" } }
    ],
    images: []
  },

  {
    id: "4",
    name: "Jogginghose Leo",
    beschreibung: "Bequeme Jogginghose mit Bündchen.",
    nummer_bezeichnung: "JH-88",
    datum: "2024-01-10T00:00:00.000Z",
    elastische_stoffe: true,
    bereits_genaeht: true,
    stoffmenge_cm: 160,
    format: { id: 1, name: "PDF" },
    groessenspektrum: { id: 3, value: "S–XXL" },
    art: { id: 4, name: "Hose" },
    kategorie_1: { id: 2, value: "Herren" },
    kategorie_2: { id: 6, value: "Sporthose", kategorie_1: 2 },
    anlass: { id: 4, value: "Sport" },
    aermel: null,
    saumlaenge: null,
    verschluss: { id: 2, value: "Ohne" },
    ausschnitt: null,
    jahrezeit: { id: 4, name: "Ganzjährig" },
    schwierigkeitsgrad: { id: 1, value: "Einfach" },
    quelle_marke: { id: 4, name: "Ottobre", type: "Magazin" },
    user: { id: "u4", username: "leo" },
    pattern_materials: [
      { materials: { id: 5, material_name: "Jersey" } }
    ],
    pattern_tags: [
      { tags: { id: 5, tag_name: "Sport" } }
    ],
    images: []
  },

  {
    id: "5",
    name: "Bluse Marie",
    beschreibung: "Leichte Bluse mit Rüschen.",
    nummer_bezeichnung: "BM-12",
    datum: "2023-04-20T00:00:00.000Z",
    elastische_stoffe: false,
    bereits_genaeht: false,
    stoffmenge_cm: 140,
    format: { id: 1, name: "PDF" },
    groessenspektrum: { id: 2, value: "34–46" },
    art: { id: 5, name: "Bluse" },
    kategorie_1: { id: 1, value: "Damen" },
    kategorie_2: { id: 7, value: "Oberteil", kategorie_1: 1 },
    anlass: { id: 5, value: "Business" },
    aermel: { id: 3, value: "Langarm" },
    saumlaenge: { id: 1, value: "Knielang" },
    verschluss: { id: 3, value: "Knöpfe" },
    ausschnitt: { id: 3, value: "Rundhals" },
    jahrezeit: { id: 2, name: "Herbst" },
    schwierigkeitsgrad: { id: 2, value: "Mittel" },
    quelle_marke: { id: 5, name: "Schnittmuster Berlin", type: "Indie" },
    user: { id: "u5", username: "marie" },
    pattern_materials: [
      { materials: { id: 6, material_name: "Leinen" } }
    ],
    pattern_tags: [
      { tags: { id: 6, tag_name: "Büro" } }
    ],
    images: []
  },

  {
    id: "6",
    name: "Kinderhose Tom",
    beschreibung: "Robuste Hose für aktive Kinder.",
    nummer_bezeichnung: "KH-77",
    datum: "2023-03-01T00:00:00.000Z",
    elastische_stoffe: false,
    bereits_genaeht: true,
    stoffmenge_cm: 120,
    format: { id: 2, name: "Papierschnitt" },
    groessenspektrum: { id: 5, value: "98–140" },
    art: { id: 4, name: "Hose" },
    kategorie_1: { id: 3, value: "Kinder" },
    kategorie_2: { id: 8, value: "Outdoor", kategorie_1: 3 },
    anlass: { id: 6, value: "Outdoor" },
    aermel: null,
    saumlaenge: null,
    verschluss: { id: 1, value: "Reißverschluss" },
    ausschnitt: null,
    jahrezeit: { id: 4, name: "Ganzjährig" },
    schwierigkeitsgrad: { id: 1, value: "Einfach" },
    quelle_marke: { id: 6, name: "Ottobre Kids", type: "Magazin" },
    user: { id: "u6", username: "tom" },
    pattern_materials: [
      { materials: { id: 7, material_name: "Cord" } }
    ],
    pattern_tags: [
      { tags: { id: 7, tag_name: "Kinder" } }
    ],
    images: []
  },

  {
    id: "7",
    name: "Rock Emilia",
    beschreibung: "Schwingender Rock mit Falten.",
    nummer_bezeichnung: "RE-09",
    datum: "2024-02-01T00:00:00.000Z",
    elastische_stoffe: false,
    bereits_genaeht: false,
    stoffmenge_cm: 150,
    format: { id: 1, name: "PDF" },
    groessenspektrum: { id: 2, value: "34–46" },
    art: { id: 6, name: "Rock" },
    kategorie_1: { id: 1, value: "Damen" },
    kategorie_2: { id: 9, value: "Rock", kategorie_1: 1 },
    anlass: { id: 1, value: "Freizeit" },
    aermel: null,
    saumlaenge: { id: 2, value: "Hüftlang" },
    verschluss: { id: 3, value: "Knöpfe" },
    ausschnitt: null,
    jahrezeit: { id: 1, name: "Sommer" },
    schwierigkeitsgrad: { id: 1, value: "Einfach" },
    quelle_marke: { id: 7, name: "Burda Easy", type: "Magazin" },
    user: { id: "u7", username: "emilia" },
    pattern_materials: [
      { materials: { id: 8, material_name: "Popeline" } }
    ],
    pattern_tags: [
      { tags: { id: 8, tag_name: "Rock" } }
    ],
    images: []
  },

  {
    id: "8",
    name: "T-Shirt Basic",
    beschreibung: "Ein einfaches Basic-Shirt.",
    nummer_bezeichnung: "TS-01",
    datum: "2023-05-10T00:00:00.000Z",
    elastische_stoffe: true,
    bereits_genaeht: true,
    stoffmenge_cm: 90,
    format: { id: 1, name: "PDF" },
    groessenspektrum: { id: 3, value: "S–XXL" },
    art: { id: 7, name: "T-Shirt" },
    kategorie_1: { id: 2, value: "Herren" },
    kategorie_2: { id: 10, value: "Basic", kategorie_1: 2 },
    anlass: { id: 2, value: "Casual" },
    aermel: { id: 2, value: "Kurzarm" },
    saumlaenge: null,
    verschluss: { id: 2, value: "Ohne" },
    ausschnitt: { id: 3, value: "Rundhals" },
    jahrezeit: { id: 4, name: "Ganzjährig" },
    schwierigkeitsgrad: { id: 1, value: "Einfach" },
    quelle_marke: { id: 8, name: "Makerist", type: "PDF" },
    user: { id: "u8", username: "ben" },
    pattern_materials: [
      { materials: { id: 9, material_name: "Jersey" } }
    ],
    pattern_tags: [
      { tags: { id: 9, tag_name: "Basic" } }
    ],
    images: []
  },

  {
    id: "9",
    name: "Abendkleid Sophia",
    beschreibung: "Elegantes Abendkleid mit Schlitz.",
    nummer_bezeichnung: "AK-300",
    datum: "2022-11-20T00:00:00.000Z",
    elastische_stoffe: false,
    bereits_genaeht: false,
    stoffmenge_cm: 280,
    format: { id: 2, name: "Papierschnitt" },
    groessenspektrum: { id: 2, value: "34–46" },
    art: { id: 1, name: "Kleid" },
    kategorie_1: { id: 1, value: "Damen" },
    kategorie_2: { id: 11, value: "Abendmode", kategorie_1: 1 },
    anlass: { id: 3, value: "Elegant" },
    aermel: { id: 1, value: "Ärmellos" },
    saumlaenge: { id: 3, value: "Wadenlang" },
    verschluss: { id: 1, value: "Reißverschluss" },
    ausschnitt: { id: 2, value: "Herzausschnitt" },
    jahrezeit: { id: 2, name: "Herbst" },
    schwierigkeitsgrad: { id: 4, value: "Schwierig" },
    quelle_marke: { id: 9, name: "McCall's", type: "Designer" },
    user: { id: "u9", username: "sophia" },
    pattern_materials: [
      { materials: { id: 10, material_name: "Satin" } }
    ],
    pattern_tags: [
      { tags: { id: 10, tag_name: "Elegant" } }
    ],
    images: [

    ]
  },

  {
    id: "10",
    name: "Babystrampler Finn",
    beschreibung: "Bequemer Strampler für Babys.",
    nummer_bezeichnung: "BS-05",
    datum: "2024-01-05T00:00:00.000Z",
    elastische_stoffe: true,
    bereits_genaeht: true,
    stoffmenge_cm: 70,
    format: { id: 1, name: "PDF" },
    groessenspektrum: { id: 6, value: "50–92" },
    art: { id: 8, name: "Strampler" },
    kategorie_1: { id: 3, value: "Kinder" },
    kategorie_2: { id: 12, value: "Baby", kategorie_1: 3 },
    anlass: { id: 6, value: "Outdoor" },
    aermel: { id: 2, value: "Kurzarm" },
    saumlaenge: null,
    verschluss: { id: 3, value: "Knöpfe" },
    ausschnitt: { id: 3, value: "Rundhals" },
    jahrezeit: { id: 2, name: "Herbst" },
    schwierigkeitsgrad: { id: 4, value: "Schwierig" },
    quelle_marke: { id: 9, name: "McCall's", type: "Designer" },
    user: { id: "u9", username: "sophia" },
    pattern_materials: [
      { materials: { id: 10, material_name: "Satin" } }
    ],
    pattern_tags: [
      { tags: { id: 10, tag_name: "Elegant" } }
    ],
    images: []
  }
];