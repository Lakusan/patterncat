import LoadingModal from "@/src/components/modals/LoadingModal";
import PatternDetails from "@/src/components/screens/PatternDetails";
import { publicPatterns } from "@/src/constants/dummyPatterns";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";


export default function PublicPatternDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pattern, setPattern] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuthContext();

  useEffect(() => {
    if (!id || userId) return;
    const patternData = publicPatterns.find((obj) => obj.id.toString() === id);
    setPattern(patternData ?? null);
    setLoading(false)
  }, [id]);

  const imageUri = pattern?.images?.[0]?.dateiname;

  if (loading) {
    let message: string = "Suche Pattern mit der ID: " + id;
    return (
      <LoadingModal
        isOpen={loading}
        message={message}
      ></LoadingModal>
    );
  }

  return (
    <>
        <Text>(public)/[id]</Text>
        {pattern ? (
          <PatternDetails pattern={pattern} />
        ) : (
          <Text>Kein Pattern mit dieser ID : ${id} gefunden</Text>
        )}
    </>
  );
}
