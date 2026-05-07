import ImageDummyPattern from "@/assets/images/patterncat_dummy_pattern_image.png";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { PatternListElement } from "@/src/types/patternTypes";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  pattern: PatternListElement;
  width: number;
  height: number;
};

export default function PatternCard({ pattern, width, height }: Props) {
  const { isLoggedIn } = useAuthContext();
  const redirectLink = isLoggedIn ? "/(main)/details/[id]" : "/(public)/[id]";
  const hasImage = !!pattern?.image;
  return (
    <View
      style={{ width, maxHeight: height, minHeight: height }}
      className="rounded-xl overflow-hidden shadow-lg bg-background"
    >
      <Pressable
        className="flex-1"
        onPress={() =>
          router.navigate({
            pathname: redirectLink,
            params: { id: pattern.id },
          })
        }
      >
        <Image
          source={
            hasImage
              ? { uri: pattern.image }
              : ImageDummyPattern
          }
          resizeMode="cover"
          style={{ width: width, height: 200}}
        />

        <View className="p-2">
          <Text className="font-semibold text-lg line-clamp-1 text-text_primary">
            {pattern.name}
          </Text>

          <Text className="mt-1 line-clamp-2 text-text_primary">
            {pattern.description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}