import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import SafeAreaContainer from '@/src/components/container/SafeAreaContainer';
import { CATEGORIES, NUM_TESTOBJECTS } from '@/src/constants/dev';
import { Pattern } from '@/src/types/patternTypes';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, useWindowDimensions, View } from 'react-native';

const MIN_CARD_WIDTH = 500;
const MIN_CARD_WIDTH_WEB = 150;
const GAP = 15;
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 6;

function getRandomCategory(): string {
  const index = Math.floor(Math.random() * CATEGORIES.length);
  return CATEGORIES[index];
}

function generateTestPatterns(count: number, ownerId = "test-user"): Pattern[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    ownerId,
    title: `Muster ${i + 1}`,
    description: `Dies ist eine Beschreibung für Muster ${i + 1}.`,
    image: `https://picsum.photos/seed/pattern-${i + 1}/300/200`,
    gallery: Array.from({ length: 5 }, (_, j) =>
      `https://picsum.photos/seed/pattern-${i + 1}-${j + 1}/300/200`
    ),
    category: getRandomCategory(),
    updatedAt: now,
  }));
}

export default function PublicHome() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const patterns = useMemo(() => generateTestPatterns(NUM_TESTOBJECTS), []);
  const { width } = useWindowDimensions();
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

  const filteredPatterns = useMemo(() => {
    if (!selectedCategory) return patterns;
    return patterns.filter((p) => p.category === selectedCategory);
  }, [patterns, selectedCategory]);

  const renderCard = ({ item: pattern }: { item: Pattern }) => (
    <View style={{ width: cardWidth }}>
      <Pressable
        onPress={() =>{
          console.log(`Navigating to pattern ${pattern.id}`)
          router.push({
            pathname: "/(public)/[id]",
            params: { id: pattern.id },
          })
        }
        }
      >
        <Card size="sm" variant="ghost" className="p-0">
          <Image
            source={{ uri: pattern.image }}
            resizeMode="cover"
            className="w-full h-40 rounded-lg"
            alt={pattern.title}
          />
          <Heading className="mt-1">{pattern.title}</Heading>
          <Text className="text-gray-600">{pattern.description}</Text>
        </Card>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaContainer>
      <View className="flex-1 items-center">
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

          {/* Grid */}
          {filteredPatterns.length > 0 ? (
            <FlatList
              data={filteredPatterns}
              renderItem={renderCard}
              keyExtractor={(pattern) => pattern.id}
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
            />
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
