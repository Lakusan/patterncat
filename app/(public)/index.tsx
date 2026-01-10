import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import SafeAreaContainer from '@/src/components/SafeAreaContainer';
import { useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, useWindowDimensions, View } from 'react-native';

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

const MIN_CARD_WIDTH = 500;
const MIN_CARD_WIDTH_WEB = 150;
const GAP = 10;
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 6;

const categories = ["Alle", "Kleider", "Hosen", "Oberteile", "Jacken"];

function getRandomCategory(): string {
  const index = Math.floor(Math.random() * categories.length);
  return categories[index];
}
const items: Item[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Muster ${i + 1}`,
  description: `Das ist eine Beschreibung für Muster ${i + 1}.`,
  image: `https://picsum.photos/seed/pattern${i + 1}/300/200`,
  category: getRandomCategory(),
}));
export default function PublicHome() {
  // const { isAuthenticated, setIsAuthenticated } = useTestContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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



  // ⭐ useMemo: Filter wird nur neu berechnet, wenn selectedCategory sich ändert
  const filteredItems = useMemo(() => {
    if (!selectedCategory) return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const testRender = ({ item }: { item: Item }) => (
    <View style={{ width: cardWidth }}>
      <Card size="sm" variant="ghost" className="p-0 md:h-[300px] h-[300px]">
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          className="w-full min-h-[70%] rounded-lg"
          alt={item.title}
        />
        <Heading className="mt-1">{item.title}</Heading>
        <Text className="text-gray-600">{item.description}</Text>
      </Card>
    </View>
  );

  return (
    <SafeAreaContainer>
      <View className="flex-1 items-center">
        <View className="flex-1 lg:w-[70%] w-full h-full shadow-lg">

          {/* ⭐ Filterbar */}
          <View className="flex-row justify-around lg:p-0 p-2 lg:h-[3%] h-[10%]">
            {categories.map((cat) => {
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
                    adjustsFontSizeToFit
                    className={`text-md ${isActive ? "text-white font-semibold" : "text-gray-700"
                      }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Grid */}
          {filteredItems.length > 0 ? (
            <FlatList
              data={filteredItems}
              renderItem={testRender}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              key={numColumns}
              numColumns={numColumns}
              columnWrapperStyle={{
                gap: GAP,
                marginTop: GAP,
              }}
              contentContainerStyle={{
                padding: GAP,
                margin: 5,
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
