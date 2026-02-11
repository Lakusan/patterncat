import { Text } from "@/components/ui/text";
import PatternDetails from "@/src/components/screens/PatternDetails";
import { supabase } from "@/src/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function PublicPatternDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [pattern, setPattern] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function getPattern(patternId: string) {
    const { data, error } = await supabase
      .from("patterns")
      .select(`
        id,
        name,
        beschreibung,
        nummer_bezeichnung,
        datum,
        elastische_stoffe,
        bereits_genaeht,
        stoffmenge_cm,

        format ( id, name ),
        groessenspektrum:groessen ( id, value ),
        art ( id, name ),
        kategorie_1 ( id, value ),
        kategorie_2 ( id, value ),
        anlass ( id, value ),
        aermel ( id, value ),
        saumlaenge ( id, value ),
        verschluss ( id, value ),
        ausschnitt ( id, value ),
        jahrezeit:jahreszeit ( id, name ),
        schwierigkeitsgrad ( id, value ),
        quelle_marke:source ( id, name, type ),
        user:profiles ( id, username ),

        pattern_materials (
          materials ( id, material_name )
        ),

        pattern_tags (
          tags ( id, tag_name )
        ),

        images (
          id,
          titel,
          beschreibung,
          dateiname,
          content_type,
          ismainimage
        )
      `)
      .eq("id", patternId)
      .maybeSingle();

    if (error) {
      console.error("Supabase Pattern Error:", error);
      return null;
    }

    return data;
  }

  useEffect(() => {
    async function load() {
      if (!id) return;

      setLoading(true);

      const patternData = await getPattern(id);

      if (!patternData) {
        console.warn("Kein Pattern gefunden oder RLS blockiert");
        setPattern(null);
      } else {
        setPattern(patternData);
      }

      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <>
        <Text>Loading…</Text>
        <Text>ID: {id}</Text>
      </>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {pattern ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            PatternName: {pattern.name}
          </Text>

          <PatternDetails item={{ id }} />

          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            Rohdaten aus der Datenbank:
          </Text>

          <Text
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              marginTop: 10,
              backgroundColor: "#eee",
              padding: 10,
              borderRadius: 8,
            }}
          >
            {JSON.stringify(pattern, null, 2)}
          </Text>
        </>
      ) : (
        <Text>Keine Pattern gefunden</Text>
      )}
    </ScrollView>
  );
}
