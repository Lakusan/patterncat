import ImageDummyPattern from "@/assets/images/patterncat_dummy_pattern_image.png";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import SafeAreaContainer from '@/src/components/container/SafeAreaContainer';
import { CATEGORIES } from '@/src/constants/dev';
import { Pattern, publicPatterns } from "@/src/constants/dummyPatterns";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Platform, Pressable, useWindowDimensions, View } from 'react-native';
import { FlatList } from "react-native-gesture-handler";

const MIN_CARD_WIDTH = 500;
const MIN_CARD_WIDTH_WEB = 150;
const MIN_CARD_HEIGHT = 200;
const GAP = 15;
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 6;

export default function PublicPatternList() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { width, height } = useWindowDimensions();
    const minWidth = Platform.select({
        native: () => MIN_CARD_WIDTH,
        default: () => MIN_CARD_WIDTH_WEB,
    })();

    const contentWidth = width * (Platform.OS === "web" ? 0.7 : 1);

    const numColumns = Math.min(
        MAX_COLUMNS,
        Math.max(MIN_COLUMNS, Math.floor(contentWidth / (minWidth + GAP)))
    );
    const usableWidth = contentWidth - GAP * 2;
    const cardWidth = usableWidth / numColumns - GAP;
    const aspectRatio = 1.35;
    const cardHeight = Math.max(MIN_CARD_HEIGHT, cardWidth * aspectRatio);

    const filteredPatterns = useMemo(() => {
      if (!selectedCategory) return publicPatterns;
      return publicPatterns.filter((p) => p.art?.name === selectedCategory);
    }, [publicPatterns, selectedCategory]);

const renderCard = ({ item: pattern }: { item: Pattern }) => (
  <View
    style={{ width: cardWidth, minHeight: cardHeight }}
    className="bg-white rounded-xl overflow-hidden"
  >
    <Pressable
      className="flex-1"
      onPress={() =>
        router.push({
          pathname: "/(public)/[id]",
          params: { id: pattern.id },
        })
      }
    >
      {/* Bild: exakt 50% der Card-Höhe */}
      <Image
        source={
          pattern?.images?.[0]?.dateiname
            ? { uri: pattern.images[0].dateiname }
            : ImageDummyPattern
        }
        resizeMode="cover"
        className="w-full h-[50%]"
      />

      {/* Content */}
      <View className="p-3 flex-1">
        <Text className="font-semibold text-lg line-clamp-1">
          {pattern.name}
        </Text>

        <Text className="text-gray-600 mt-1 line-clamp-2">
          {pattern.beschreibung}
        </Text>
      </View>
    </Pressable>
  </View>
);

    return (
        <SafeAreaContainer>
            < View className="flex-1 items-center">
                <View className="flex-1 lg:w-[70%] w-full h-full shadow-lg">

                    {/* Filterbar */}
                    <View className="flex-row justify-around lg:p-0 p-2 lg:h-[3%] h-[5%]">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat || (cat === "Alle" && selectedCategory === null);
                            return (
                                <Pressable
                                    key={cat}
                                    onPress={() =>
                                        setSelectedCategory(cat === "Alle" ? null : cat)
                                    }
                                    className={`
                    flex-1 flex-shrink justify-center items-center rounded m-1
                    ${isActive ? "bg-purple-800" : "bg-gray-200"}
                  `}
                                >
                                    <Text
                                        className={`text-md ${isActive ? "text-white font-semibold" : "text-gray-700"}`}
                                    >
                                        {cat}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    {filteredPatterns.length > 0 ? (
                    <FlatList
                        data={filteredPatterns}
                        renderItem={renderCard}
                        keyExtractor={(publicPatterns) => publicPatterns.id}
                        showsVerticalScrollIndicator={false}
                        key={numColumns}
                        numColumns={numColumns}
                        columnWrapperStyle={{
                                gap: GAP,
                                justifyContent: "center",
                                paddingBottom: 20,
                            }}
                            contentContainerStyle={{
                                padding: GAP,
                            }}
                    ></FlatList>
                            ) : (
                              <Text className="bg-red-500 text-center mt-4">
                                Keine Schnittmuster gefunden 😢
                              </Text>
                            )} 
                </View>
            </View>
        </SafeAreaContainer>
    );
}
