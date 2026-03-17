import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import SafeAreaContainer from "@/src/components/container/SafeAreaContainer";
import PatternDetails from "@/src/components/screens/PatternDetails";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { patternService } from "@/src/services/data";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PatternDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuthContext();

  const [pattern, setPattern] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [getImage, setImage] = useState("");

  useEffect(() => {
    async function load() {
      if (!id || !userId) 
        {
          console.log(`patternId: ${id} userId: ${userId}`)
          return;
        }
      setLoading(true);

      const patternData = await patternService.getPatternById(id, userId);
     if (!patternData) {
        console.warn("Kein Pattern gefunden oder RLS blockiert");
        setPattern(null);
      } else {
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

        {pattern ? (
          <>
            <PatternDetails pattern={pattern} />

            {/* <Text style={{ marginTop: 20, fontWeight: "bold" }}>
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
            </Text> */}
          </>
        ) : (
          <Text>Keine Pattern gefunden</Text>
        )}
    </SafeAreaContainer>
  );
}
