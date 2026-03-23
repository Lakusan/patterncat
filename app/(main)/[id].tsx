import { Text } from "@/components/ui/text";
import SafeAreaContainer from "@/src/components/container/SafeAreaContainer";
import LoadingModal from "@/src/components/modals/LoadingModal";
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
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      // setLoading(false);
    }

    load();
  }, [id, userId]);

  if (loading) {
    return (
      <LoadingModal
      isOpen={loading}
      message="Lade Pattern"
      ></LoadingModal>
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
