import ImageDummyPattern from "@/assets/images/patterncat_dummy_pattern_image.png";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import SafeAreaContainer from "@/src/components/container/SafeAreaContainer";
import { publicPatterns } from "@/src/constants/dummyPatterns";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function PublicPatternDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuthContext();

  const [pattern, setPattern] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [getImage, setImage] = useState<string | null | undefined>();

  useEffect(() => {
    async function load() {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);

      const patternData = publicPatterns.find(obj => {
        return obj.id === id;
      });
      if(patternData?.images.length != 0)  setImage(patternData?.images[0].dateiname)
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
        <Image
          source={ImageDummyPattern}
          className="h-[50%] w-full m-10"
          alt="image"
        />
      )}

      <ScrollView style={{ padding: 16 }}>
        {pattern ? (
          <>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              PatternName: {pattern.name}
            </Text>

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
