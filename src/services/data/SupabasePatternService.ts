// src/services/patternService.supabase.ts

import { supabase } from "@/src/lib/supabase";
import {
  Pattern,
  RawPattern,
  mapRawPatternToPattern
} from "@/src/types/patternTypes";
import { PatternService } from "./PatternService";

export const supabasePatternService: PatternService = {

    async getAll(): Promise<Pattern[]> {
    const { data, error } = await supabase
      .from("patterns")
      .select("*");

    if (error) throw error;
    if (!data) return [];

    return data.map(mapRawPatternToPattern);
  },
  async getAllRaw(): Promise<RawPattern[]> {
    const { data, error } = await supabase
      .from("patterns")
      .select("*");

    if (error) throw error;
    if (!data) return [];

    return data;
  },

  async getById(id: number): Promise<Pattern | null> {
    const { data, error } = await supabase
      .from("patterns")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return mapRawPatternToPattern(data);
  },
};



//   async getPatternById( patternId: string){
//         const { data, error } = await supabase
//       .from("patterns")
//       .select(`
//         id,
//         name,
//         beschreibung,
//         nummer_bezeichnung,
//         datum,
//         elastische_stoffe,
//         bereits_genaeht,
//         stoffmenge_cm,

//         format ( id, name ),
//         groessenspektrum:groessen ( id, value ),
//         art ( id, name ),
//         kategorie_1 ( id, value ),
//         kategorie_2 ( id, value ),
//         anlass ( id, value ),
//         aermel ( id, value ),
//         saumlaenge ( id, value ),
//         verschluss ( id, value ),
//         ausschnitt ( id, value ),
//         jahrezeit:jahreszeit ( id, name ),
//         schwierigkeitsgrad ( id, value ),
//         quelle_marke:source ( id, name, type ),
//         user:profiles ( id, username ),

//         pattern_materials (
//           materials ( id, material_name )
//         ),

//         pattern_tags (
//           tags ( id, tag_name )
//         ),

//         images (
//           id,
//           titel,
//           beschreibung,
//           dateiname,
//           content_type,
//           ismainimage
//         )
//       `)
//       .eq("id", patternId)
//       .maybeSingle();

//     if (error) {
//       console.error("Supabase Pattern Error:", error);
//       return null;
//     }

//     return data;
//   },

//   async getUserProfile(id: string) {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("username")
//       .eq("id", id)
//       .maybeSingle();

//     if (error) {
//       console.error("Supabase error:", error);
//       return null;
//     }

//     return data;
//   }
// };
