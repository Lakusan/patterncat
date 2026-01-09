import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import SafeAreaContainer from '@/src/components/SafeAreaContainer';
import { useTestContext } from '@/src/hooks/use-test-context';
import { useState } from 'react';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

const MIN_CARD_WIDTH = 150;
const GAP = 5;

export default function PublicHome() {
  const { isAuthenticated, setIsAuthenticated } = useTestContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { width } = useWindowDimensions();

  // Content container is 70% of screen width
  const contentWidth = width * 0.7;

  // Calculate number of columns based on available content width
const numColumns = Math.min( 10, Math.max(1, Math.floor(contentWidth / (MIN_CARD_WIDTH + GAP))) );
  // Calculate fixed card width
  const cardWidth = contentWidth / numColumns - GAP;

  const categories = ["Alle", "Kleider", "Hosen", "Oberteile", "Jacken"];

  function getRandomCategory(): string {
    const index = Math.floor(Math.random() * categories.length);
    return categories[index];
  }

  const items: Item[] = Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Muster ${i + 1}`,
    description: `Das ist eine Beschreibung für Muster ${i + 1}.`,
    image: `https://picsum.photos/seed/pattern${i + 1}/300/200`,
    category: getRandomCategory(),
  }));

  const filteredItems =
    selectedCategory === null
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const testRender = ({ item }: { item: Item }) => (
    <View style={{ width: cardWidth }}>
      <Card
        size="sm"
        variant="outline"
        className="bg-green-500"
      >
        <Image
          source={{ uri: item.image }}
          resizeMode='cover'
          className="w-full h-32 rounded-t-lg"
          alt={item.title}
        />
        <Heading className="mt-1 bg-blue-500">{item.title}</Heading>
        <Text className="text-gray-600 bg-red-500">{item.description}</Text>
      </Card>
    </View>
  );

  return (
    <SafeAreaContainer>
      <View className="flex-1 bg-neutral-300 items-center">
        <View className="flex-1 w-[70%] h-full shadow-lg elevated">

          {/* Filterbar */}
          <View className="flex-row justify-around h-[3%]">
            {categories.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat === "Alle" ? null : cat)}
                className={`flex-1 flex-shrink justify-center items-center rounded m-1 ${
                  selectedCategory === cat ? "bg-purple-800" : "bg-gray-200"
                }`}
              >
                <Text
                  adjustsFontSizeToFit
                  className={`text-md ${
                    selectedCategory === cat
                      ? "text-white font-semibold"
                      : "text-gray-700"
                  }`}
                  numberOfLines={3}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Grid */}
          {items.length > 0 ? (
            <FlatList
              data={filteredItems}
              renderItem={testRender}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              key={numColumns} // re-render when columns change
              numColumns={numColumns}
              columnWrapperStyle={{
                gap: GAP,
                justifyContent: "flex-start",
                marginTop: GAP // prevents stretching last row
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
