import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import SafeAreaContainer from "@/src/components/container/SafeAreaContainer";
import PatternDetails from "@/src/components/screens/PatternDetails";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { patternService } from "@/src/services/data";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function PublicPatternDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuthContext();

  const [pattern, setPattern] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [getImage, setImage] = useState("");

  useEffect(() => {
    async function load() {
      console.log("Lade Daten")
      // if (!id || !userId) 
      if(!id)
        {
          console.log(`patternId: ${id} userId: ${userId}`)
          setLoading(false);
          return;
        }
      setLoading(true);
      console.log("Loading True")

      const patternData = await patternService.getPatternById(id, "488be6f5-97e4-4ad6-a652-5a057c646ea8");

      if (!patternData) {
        console.warn("Kein Pattern gefunden oder RLS blockiert");
        setPattern(null);
      } else {
      console.log("Set Pattern Data")
        setPattern(patternData);
      }

      setLoading(false);
    }

    load();
  }, [id, userId]);

  if (loading) {
    return (
      <>
        <Text>Loading…</Text>
        <Text>ID: {id}</Text>
      </>
    );
  }

  return (
    <SafeAreaContainer>
      {getImage ? (
        <Image
          source={{ uri: getImage }}
          className="h-[50%] w-full m-10"
          alt="image"
        />
      ) : (
        <Text>Kein Bild</Text>
      )}

      <ScrollView style={{ padding: 16 }}>
        {pattern ? (
          <>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              PatternName: {pattern.name}
            </Text>

            <PatternDetails />

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
    </SafeAreaContainer>
  );
}
