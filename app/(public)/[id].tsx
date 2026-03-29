import ImageDummyPattern from "@/assets/images/patterncat_dummy_pattern_image.png";
import { Text } from "@/components/ui/text";
import { publicPatterns } from "@/src/constants/dummyPatterns";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";


export default function PublicPatternDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pattern, setPattern] = useState<any>(null);

  useEffect(() => {
    const patternData = publicPatterns.find((obj) => obj.id === id);
    setPattern(patternData ?? null);
  }, [id]);

  if (!pattern) {
    return <Text>Kein Pattern mit dieser ID : ${id} gefunden</Text>;
  }

  const imageUri = pattern?.images?.[0]?.dateiname;

  return (
    <ScrollView className="flex-1">
      <Text>Public ID: {id}</Text>

      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : ImageDummyPattern
        }
        resizeMode="cover"
        style={{
          width: "100%",
          height: 400, // feste Höhe für Web
          backgroundColor: "#ddd",
        }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
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
    </ScrollView>
  );
}
