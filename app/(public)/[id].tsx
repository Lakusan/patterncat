import LoadingModal from "@/src/components/modals/LoadingModal";
import PatternDetails from "@/src/components/screens/PatternDetails";
import { publicPatterns } from "@/src/constants/dummyPatterns";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { useTheme } from "@/src/contexts/use-theme-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Appearance, Text } from "react-native";




export default function PublicPatternDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pattern, setPattern] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuthContext();
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!id || userId) return;
    const patternData = publicPatterns.find((obj) => obj.id.toString() === id);
    setPattern(patternData ?? null);
    setLoading(false)
  }, [id, userId]);
  
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
    <Text>ANDROID SYSTEM THEME:{Appearance.getColorScheme()};</Text>
        <Text>(public)/[id] theme: {theme}</Text>
        {pattern ? (
          <PatternDetails pattern={pattern} />
        ) : (
          <Text>Kein Pattern mit dieser ID : ${id} gefunden</Text>
        )}
    </>
  );
}
