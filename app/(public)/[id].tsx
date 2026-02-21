import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack/index.web";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import SafeAreaContainer from "@/src/components/container/SafeAreaContainer";
import PatternDetails from "@/src/components/screens/PatternDetails";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { supabase } from "@/src/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";


export default function PublicPatternDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [pattern, setPattern] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const AuthProvider = useAuthContext();


  const [getImage, setImage] = useState("");


  useEffect(() => {
    async function load() {
      if (!id) return;

      setLoading(true);

      const patternData = await (id);

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

  if (__DEV__) {
    return (
      <>
        <SafeAreaContainer>
          <Image
            source={require("@/assets/images/patterncat_dummy_pattern_image.png")}
            className="w-full h-[50%]"
            resizeMode="cover"
          />
          <VStack>
          <Heading>Title</Heading>
          <HStack>
            <Text>Category</Text>
            <Text>Author</Text>
          </HStack>
          </VStack>
        </SafeAreaContainer>
      </>

    )
  }

  return (
    <SafeAreaContainer>
      {getImage ? (
        <Image
          source={{ uri: getImage }}
          className="h-[50%] w-full m-10"></Image>
      ) : (
        <Text>Kein Bild</Text>
      )}
      <Button size="sm" variant="solid" className="bg-green-500" onPress={async () => {
        const { data, error } = await supabase.from("pattern_tags").select("*")
        if (data) console.log(data)
        if (error) console.error(error)

      }
      }>
        <ButtonText>Get SQL </ButtonText>
      </Button>
      <Button size="sm" variant="solid" className="bg-green-500" onPress={
        async () => {
          const { data: signed } = await supabase
            .storage
            .from("images")
            .createSignedUrl(`${AuthProvider.userId}/${pattern.id}/Dummy.jpg`, 60 * 60)
          if (signed) setImage(signed.signedUrl)
          console.log("Files:", signed);
        }

      }>
        <ButtonText>Get Bucket </ButtonText>
      </Button>

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
    </SafeAreaContainer >
  );
}
