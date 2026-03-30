import type { Pattern } from '@/src/types/patternTypes'

export const publicPatterns: Pattern[] = [
  {
    id: 1,
    name: "Sommerkleid Anna",

    format: "PDF",
    groessenspektrum: "34–46",
    art: "Kleid",
    kategorie_1: "Damen",
    kategorie_2: "Sommerkleid",
    anlass: "Freizeit",

    beschreibung: "Ein luftiges Sommerkleid mit ausgestelltem Rock.",

    aermel: "Kurzarm",
    saumlaenge: "Knielang",
    verschluss: "Reißverschluss",
    ausschnitt: "V-Ausschnitt",

    quelle_marke: "Burda",
    quelle_type: "Magazin",

    magazin_monat: 10,
    magazin_jahr: 1968,
    nummer_bezeichnung: "Modell 102A",
    datum: "2024-06-15T00:00:00.000Z",

    elastische_stoffe: false,
    bild_linienzeichnung: null,
    bereits_genaeht: true,

    jahreszeit: "Sommer",
    schwierigkeitsgrad: "Mittel",

    stoffmenge_cm: 180,
    user_id: "u1",

    images: [
      {
        id: 1,
        url: "https://picsum.photos/200?random=101",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=101",
        content_type: "image/jpeg",
        ismainimage: true
      },
      {
        id: 2,
        url: "https://picsum.photos/200?random=102",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=102",
        content_type: "image/jpeg",
        ismainimage: true
      },
      {
        id: 3,
        url: "https://picsum.photos/200?random=103",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=103",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ],

    materials: ["Baumwolle", "Viskose"],

    tags: ["Sommer", "Einfach"]
  },

  {
    id: 2,
    name: "Hoodie Max",

    format: "PDF",
    groessenspektrum: "S–XXL",
    art: "Hoodie",
    kategorie_1: "Herren",
    kategorie_2: "Pullover",
    anlass: "Casual",

    beschreibung: "Bequemer Hoodie mit Kapuze und Kängurutasche.",

    aermel: "Langarm",
    saumlaenge: "Hüftlang",
    verschluss: "Ohne",
    ausschnitt: "Rundhals",

    quelle_marke: "Simplicity",
    quelle_type: "Schnittmuster",

    magazin_monat: 8,
    magazin_jahr: 1955,
    nummer_bezeichnung: "HM-204",
    datum: "2023-10-01T00:00:00.000Z",

    elastische_stoffe: true,
    bild_linienzeichnung: null,
    bereits_genaeht: false,

    jahreszeit: "Herbst",
    schwierigkeitsgrad: "Fortgeschritten",

    stoffmenge_cm: 220,
    user_id: "u2",

    images: [
      {
        id: 1,
        url: "https://picsum.photos/200?random=102",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=102",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ],

    materials: ["Sweatstoff"],
    tags: ["Casual"]
  },
  {
    id: 3,
    name: "Wintermantel Clara",

    format: "Papierschnitt",
    groessenspektrum: "36–50",
    art: "Mantel",
    kategorie_1: "Damen",
    kategorie_2: "Wintermantel",
    anlass: "Elegant",

    beschreibung: "Eleganter Mantel mit Taillengürtel.",

    aermel: "Langarm",
    saumlaenge: "Wadenlang",
    verschluss: "Knöpfe",
    ausschnitt: "Stehkragen",

    quelle_marke: "Vogue",
    quelle_type: "Designer",

    magazin_monat: 3,
    magazin_jahr: 2020,
    nummer_bezeichnung: "WM-501",
    datum: "2022-12-01T00:00:00.000Z",

    elastische_stoffe: false,
    bild_linienzeichnung: null,
    bereits_genaeht: false,

    jahreszeit: "Winter",
    schwierigkeitsgrad: "Schwierig",

    stoffmenge_cm: 350,
    user_id: "u3",

    images: [
      {
        id: 1,
        url: "https://picsum.photos/200?random=111",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=111",
        content_type: "image/jpeg",
        ismainimage: true
      },
      {
        id: 2,
        url: "https://picsum.photos/200?random=112",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=112",
        content_type: "image/jpeg",
        ismainimage: true
      },
      {
        id: 3,
        url: "https://picsum.photos/200?random=113",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=113",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ],

    materials: ["Wolle"],
    tags: ["Winter"]
  },
  {
    id: 4,
    name: "Jogginghose Leo",

    format: "PDF",
    groessenspektrum: "S–XXL",
    art: "Hose",
    kategorie_1: "Herren",
    kategorie_2: "Sporthose",
    anlass: "Sport",

    beschreibung: "Bequeme Jogginghose mit Bündchen.",

    aermel: null,
    saumlaenge: null,
    verschluss: "Ohne",
    ausschnitt: null,

    quelle_marke: "Ottobre",
    quelle_type: "Magazin",

    magazin_monat: 1,
    magazin_jahr: 2001,
    nummer_bezeichnung: "JH-88",
    datum: "2024-01-10T00:00:00.000Z",

    elastische_stoffe: true,
    bild_linienzeichnung: null,
    bereits_genaeht: true,

    jahreszeit: "Ganzjährig",
    schwierigkeitsgrad: "Einfach",

    stoffmenge_cm: 160,
    user_id: "u4",

    images: [
      {
        id: 1,
        url: "https://picsum.photos/200?random=121",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=121",
        content_type: "image/jpeg",
        ismainimage: true
      },
            {
        id: 2,
        url: "https://picsum.photos/200?random=122",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=122",
        content_type: "image/jpeg",
        ismainimage: true
      },
            {
        id: 3,
        url: "https://picsum.photos/200?random=123",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=123",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ],

    materials: ["Jersey"],
    tags: ["Sport"]
  },
  {
    id: 5,
    name: "Bluse Marie",

    format: "PDF",
    groessenspektrum: "34–46",
    art: "Bluse",
    kategorie_1: "Damen",
    kategorie_2: "Oberteil",
    anlass: "Business",

    beschreibung: "Leichte Bluse mit Rüschen.",

    aermel: "Langarm",
    saumlaenge: "Knielang",
    verschluss: "Knöpfe",
    ausschnitt: "Rundhals",

    quelle_marke: "Schnittmuster Berlin",
    quelle_type: "Indie",

    magazin_monat: 12,
    magazin_jahr: 2003,
    nummer_bezeichnung: "BM-12",
    datum: "2023-04-20T00:00:00.000Z",

    elastische_stoffe: false,
    bild_linienzeichnung: null,
    bereits_genaeht: false,

    jahreszeit: "Herbst",
    schwierigkeitsgrad: "Mittel",

    stoffmenge_cm: 140,
    user_id: "u5",

    images: [
      {
        id: 1,
        url: "https://picsum.photos/200?random=131",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=131",
        content_type: "image/jpeg",
        ismainimage: true
      },
            {
        id: 2,
        url: "https://picsum.photos/200?random=132",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=132",
        content_type: "image/jpeg",
        ismainimage: true
      },
            {
        id: 3,
        url: "https://picsum.photos/200?random=133",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=133",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ],

    materials: ["Leinen"],
    tags: ["Büro"]
  },
  {
    id: 6,
    name: "Kinderhose Tom",

    format: "Papierschnitt",
    groessenspektrum: "98–140",
    art: "Hose",
    kategorie_1: "Kinder",
    kategorie_2: "Outdoor",
    anlass: "Outdoor",

    beschreibung: "Robuste Hose für aktive Kinder.",

    aermel: null,
    saumlaenge: null,
    verschluss: "Reißverschluss",
    ausschnitt: null,

    quelle_marke: "Ottobre Kids",
    quelle_type: "Magazin",

    magazin_monat: 6,
    magazin_jahr: 2022,
    nummer_bezeichnung: "KH-77",
    datum: "2023-03-01T00:00:00.000Z",

    elastische_stoffe: false,
    bild_linienzeichnung: null,
    bereits_genaeht: true,

    jahreszeit: "Ganzjährig",
    schwierigkeitsgrad: "Einfach",

    stoffmenge_cm: 120,
    user_id: "u6",

    images: [
      {
        id: 1,
        url: "https://picsum.photos/200?random=106",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=106",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ],

    materials: ["Cord"],
    tags: ["Kinder"]
  },
  {
    id: 7,
    name: "Rock Emilia",

    format: "PDF",
    groessenspektrum: "34–46",
    art: "Rock",
    kategorie_1: "Damen",
    kategorie_2: "Rock",
    anlass: "Freizeit",

    beschreibung: "Schwingender Rock mit Falten.",

    aermel: null,
    saumlaenge: "Hüftlang",
    verschluss: "Knöpfe",
    ausschnitt: null,

    quelle_marke: "Burda Easy",
    quelle_type: "Magazin",

    magazin_monat: 5,
    magazin_jahr: 1995,
    nummer_bezeichnung: "RE-09",
    datum: "2024-02-01T00:00:00.000Z",

    elastische_stoffe: false,
    bild_linienzeichnung: null,
    bereits_genaeht: false,

    jahreszeit: "Sommer",
    schwierigkeitsgrad: "Einfach",

    stoffmenge_cm: 150,
    user_id: "u7",

    images: [
      {
        id: 1,
        url: "https://picsum.photos/200?random=10",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=10",
        content_type: "image/jpeg",
        ismainimage: true
      },
      {
        id: 1,
        url: "https://picsum.photos/200?random=10",
        titel: "Hauptbild",
        beschreibung: "Das fertige Kleid auf einer Schneiderpuppe.",
        dateiname: "https://picsum.photos/200?random=10",
        content_type: "image/jpeg",
        ismainimage: true
      }
    ],

    materials: ["Popeline"],
    tags: ["Rock"]
  },
  {
    id: 8,
    name: "T-Shirt Basic",

    format: "PDF",
    groessenspektrum: "S–XXL",
    art: "T-Shirt",
    kategorie_1: "Herren",
    kategorie_2: "Basic",
    anlass: "Casual",

    beschreibung: "Ein einfaches Basic-Shirt.",

    aermel: "Kurzarm",
    saumlaenge: null,
    verschluss: "Ohne",
    ausschnitt: "Rundhals",

    quelle_marke: "Makerist",
    quelle_type: "PDF",

    magazin_monat: 2,
    magazin_jahr: 1998,
    nummer_bezeichnung: "TS-01",
    datum: "2023-05-10T00:00:00.000Z",

    elastische_stoffe: true,
    bild_linienzeichnung: null,
    bereits_genaeht: true,

    jahreszeit: "Ganzjährig",
    schwierigkeitsgrad: "Einfach",

    stoffmenge_cm: 90,
    user_id: "u8",

    images: [],

    materials: ["Jersey"],
    tags: ["Basic"]
  },
  {
    id: 9,
    name: "Abendkleid Sophia",

    format: "Papierschnitt",
    groessenspektrum: "34–46",
    art: "Kleid",
    kategorie_1: "Damen",
    kategorie_2: "Abendmode",
    anlass: "Elegant",

    beschreibung: "Elegantes Abendkleid mit Schlitz.",

    aermel: "Ärmellos",
    saumlaenge: "Wadenlang",
    verschluss: "Reißverschluss",
    ausschnitt: "Herzausschnitt",

    quelle_marke: "McCall's",
    quelle_type: "Designer",

    magazin_monat: null,
    magazin_jahr: null,
    nummer_bezeichnung: "AK-300",
    datum: "2022-11-20T00:00:00.000Z",

    elastische_stoffe: false,
    bild_linienzeichnung: null,
    bereits_genaeht: false,

    jahreszeit: "Herbst",
    schwierigkeitsgrad: "Schwierig",

    stoffmenge_cm: 280,
    user_id: "u9",

    images: [],

    materials: ["Satin"],
    tags: ["Elegant"]
  },
  {
    id: 10,
    name: "Babystrampler Finn",

    format: "PDF",
    groessenspektrum: "50–92",
    art: "Strampler",
    kategorie_1: "Kinder",
    kategorie_2: "Baby",
    anlass: "Outdoor",

    beschreibung: "Bequemer Strampler für Babys.",

    aermel: "Kurzarm",
    saumlaenge: null,
    verschluss: "Knöpfe",
    ausschnitt: "Rundhals",

    quelle_marke: "McCall's",
    quelle_type: "Designer",

    magazin_monat: 7,
    magazin_jahr: 2023,
    nummer_bezeichnung: "BS-05",
    datum: "2024-01-05T00:00:00.000Z",

    elastische_stoffe: true,
    bild_linienzeichnung: null,
    bereits_genaeht: true,

    jahreszeit: "Herbst",
    schwierigkeitsgrad: "Schwierig",

    stoffmenge_cm: 70,
    user_id: "u9",

    images: [],

    materials: ["Satin"],
    tags: ["Elegant"]
  }
]