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
  const [image, setImage] = useState("");

  useEffect(() => {
    async function load() {
      if (!id || !userId) {
        return;
      }
      setLoading(true);

      const patternData = await patternService.getPatternById(id, userId);
      if (!patternData) {
        console.warn("Kein Pattern gefunden oder RLS blockiert");
        setPattern(null);
      } else {
        setPattern(patternData);
        console.log(`ID: Pattern: ${JSON.stringify(patternData.images)}`)
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
      {pattern ? (
        <PatternDetails pattern={pattern} />
      ) : (
        <Text>Keine Pattern gefunden</Text>
      )}
    </SafeAreaContainer>
  );
}
