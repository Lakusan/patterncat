
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import SafeAreaContainer from '@/src/components/SafeAreaContainer';
import { useTestContext } from '@/src/hooks/use-test-context';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

const MIN_CARD_WIDTH = 150;
const GAP = 15;

// Component View shrinks with number of Cards < Flatlist.numCols. -> Min Size View?
// FilterList: Select and deselect. If none is selected filter -> Null instead of Alle Button
// Pressable fixed Sizes and centered. Currently only flex-1 works


export default function PublicHome() {
  const { isAuthenticated, setIsAuthenticated } = useTestContext();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)


  // TODO: Beim Start der App dynamisch aus DB zeihen
  const categories = ["Alle", "Kleider", "Hosen", "Oberteile", "Jacken"];
  // DEV
  function getRandomCategory(): string {
    const index = Math.floor(Math.random() * categories.length);
    return categories[index];
  }

  const items: Item[] = Array.from({ length: 500 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Muster ${i + 1}`,
    description: `Das ist eine Beschreibung für Muster ${i + 1}.`,
    image: `https://picsum.photos/seed/pattern${i + 1}/300/200`,
    category: getRandomCategory(),
  }));
  // ------

  // Filter Logic
  const filteredItems =
    selectedCategory === null
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Card/Item Rendering 
  const renderItem = ({ item }: { item: Item }) => (

    <Card
      variant="filled"
      className="
      p-0
      bg-white 
      rounded-xl 
      shadow 
      m-2
      w-1/2
      sm:w-1/3
      md:w-1/4 
      lg:w-1/5 
      max-w-[3600px]
      h-[360px]
      flex flex-col
    "
    >
      <View className="flex-[0.6]">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full rounded-t-lg"
          resizeMode="cover"
        />
      </View>

      <View className="flex-[0.2] justify-center">
        <Heading className="font-semibold text-lg p-2">
          {item.title}
        </Heading>
      </View>

      <View className="flex-[0.2] justify-center p-2">
        <Text className="text-gray-500 text-sm">
          {item.description}
        </Text>
      </View>
    </Card>

  );

  return (
    <SafeAreaContainer>
      <View className="flex-1 bg-green-500 items-center">
      <View className="flex-row bg-blue-500 lg:w-1/2 w-full">
        {/* Category chips */}
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => {
              setSelectedCategory(cat === "Alle" ? null : cat);
              }
              }
              className={`p-2 m-2 flex-1 rounded ${selectedCategory === cat
                ? "bg-purple-800"
                : "bg-gray-200"
                }`}
            >
              <Text
                className={`text-sm text-center ${selectedCategory === cat
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
        
        <View className="flex-1 bg-pink-500 lg:w-1/2 w-full">
          {items && items.length > 0 ? (
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              numColumns={5}
              onRefresh={() => console.log("refreshing")}
              refreshing={false}
            />
          ) : (
            <Text className="bg-red-500 text-center mt-4"> Keine Schnittmuster gefunden 😢</Text>
          )}
        </View>
      </View>
    </SafeAreaContainer>
  );
}