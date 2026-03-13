// src/services/patternService.supabase.ts

import { supabase } from "@/src/lib/supabase";
import { PatternService } from "@/src/services/data/PatternService";
import { Pattern, PatternListElement } from "@/src/types/patternTypes";

export const supabasePatternService: PatternService = {

  async getAllPatternListElements(userId: string): Promise<PatternListElement[]> {
    const { data, error } = await supabase
      .from("patterns")
      .select(`
        id,
        name,
        beschreibung,
        art,
        datum,
        images (
          id,
          path
        )
      `)
      .eq("user_id", userId);

    if (error) throw error;

    return (data ?? []).map((raw) => ({
      id: raw.id,
      name: raw.name,
      description: raw.beschreibung,
      image: raw.images?.[0]?.path ?? null,
      category: raw.art?.toString() ?? null,
      updatedAt: raw.datum ? Date.parse(raw.datum) : null,
    }));
  },

  async getAllPatterns(userId: string): Promise<Pattern[]> {
    const { data, error } = await supabase
      .from("patterns")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return data as Pattern[];
  },

  async getPatternById(id: string, userId: string): Promise<Pattern | null> {
    const { data, error } = await supabase
      .from("patterns")
      .select(`
      *,
      format:format (*),
      groessenspektrum:groessen (*),
      art:art (*),
      kategorie_1:kategorie_1 (*),
      kategorie_2:kategorie_2 (*),
      anlass:anlass (*),
      aermel:aermel (*),
      saumlaenge:saumlaenge (*),
      verschluss:verschluss (*),
      ausschnitt:ausschnitt (*),
      quelle_marke:source (*),
      jahreszeit:jahrezeit (*),
      schwierigkeitsgrad:schwierigkeitsgrad (*),
      images:images (*),
      materials:pattern_materials (
        id,
        material:materials (*)
      ),
      tags:pattern_tags (
        tag:tags (*)
      )
    `)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    // 🔥 Signed URLs erzeugen
    const signedImages = await Promise.all(
      (data.images ?? []).map(async (img: any) => {
        const { data: signed } = await supabase.storage
          .from("images")
          .createSignedUrl(img.path, 60 * 60);
        return {
          id: img.id,
          url: signed?.signedUrl ?? null,
          titel: img.titel,
          beschreibung: img.beschreibung,
          ismainimage: img.ismainimage,
          content_type: img.content_type,
          dateiname: img.dateiname,
        };
      })
    );

    // 🔥 Normalisiertes Pattern zurückgeben
    return {
      id: data.id,
      name: data.name,

      format: data.format?.name ?? null,
      groessenspektrum: data.groessenspektrum?.value ?? null,
      art: data.art?.name ?? null,
      kategorie_1: data.kategorie_1?.value ?? null,
      kategorie_2: data.kategorie_2?.value ?? null,
      anlass: data.anlass?.value ?? null,

      beschreibung: data.beschreibung,

      aermel: data.aermel?.value ?? null,
      saumlaenge: data.saumlaenge?.value ?? null,
      verschluss: data.verschluss?.value ?? null,
      ausschnitt: data.ausschnitt?.value ?? null,

      quelle_marke: data.quelle_marke?.name ?? null,
      quelle_type: data.quelle_marke?.type ?? null,

      magazin_monat: data.magazin_monat,
      magazin_jahr: data.magazin_jahr,
      nummer_bezeichnung: data.nummer_bezeichnung,
      datum: data.datum,
      elastische_stoffe: data.elastische_stoffe,
      bild_linienzeichnung: data.bild_linienzeichnung,
      bereits_genaeht: data.bereits_genaeht,

      jahreszeit: data.jahreszeit?.name ?? null,
      schwierigkeitsgrad: data.schwierigkeitsgrad?.value ?? null,

      stoffmenge_cm: data.stoffmenge_cm,
      user_id: data.user_id,

      images: signedImages,

      materials: data.materials?.map((m: any) => m.material.material_name) ?? [],
      tags: data.tags
  ?.filter((t: any) => t.tag !== null)
  .map((t: any) => t.tag.tag_name) ?? [],

    };
  },

  async updatePattern(
    id: string,
    data: Partial<Omit<Pattern, "id" | "user_id">>,
    userId: string
  ): Promise<Pattern> {
    const { data: updated, error } = await supabase
      .from("patterns")
      .update(data)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    return updated as Pattern;
  },

  async deletePattern(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("patterns")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
  },
  async createPattern(
    data: Omit<Pattern, "id" | "user_id" | "images" | "materials" | "tags">,
    userId: string
  ): Promise<Pattern> {
    const { data: inserted, error } = await supabase
      .from("patterns")
      .insert([{ ...data, user_id: userId }])
      .select()
      .single();

    if (error) throw error;

    // frisch angelegtes Pattern hat noch keine Images, Materials, Tags
    return {
      ...inserted,
      format: null,
      groessenspektrum: null,
      art: null,
      kategorie_1: null,
      kategorie_2: null,
      anlass: null,
      aermel: null,
      saumlaenge: null,
      verschluss: null,
      ausschnitt: null,
      quelle_marke: null,
      quelle_type: null,
      jahreszeit: null,
      schwierigkeitsgrad: null,
      images: [],
      materials: [],
      tags: [],
    };
  }

};
