import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { FlatList, Pressable, View } from "react-native";

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

const categories = ["Kleider", "Hosen", "Oberteile", "Jacken"];

function getRandomCategory(): string {
  const index = Math.floor(Math.random() * categories.length);
  return categories[index];
}

const items: Item[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Muster ${i + 1}`,
  description: `Das ist eine Beschreibung für Muster ${i + 1}.`,
  image: `https://picsum.photos/seed/pattern${i + 1}/300/200`,
  category: getRandomCategory(),
}));


export default function PatternList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter Logic
 const filteredItems =
    selectedCategory === null
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const renderItem = ({ item }: { item: Item }) => (
    <Card size="md" variant="ghost">
      <Image
        source={{ uri: item.image }}
        className="w-full h-[160px] rounded-md"
        alt="image"
      />
      <Text className="text-xs font-normal mt-2 text-typography-700">
        {item.description}
      </Text>
      <Heading size="sm" className="mt-2">
        {item.title} 
      </Heading>
    </Card>
  );
  return (
    <View className="flex-1 justify-center items-center">
      {/* Category Chips */}
      <View className="flex-row w-full h-[40px] m-1 items-center justify-center gap-2">
        {/* "All" chip */}
        <Pressable
          onPress={() => setSelectedCategory(null)}
          className={`h-[20px] w-[80px] rounded ${
            selectedCategory === null
              ? "bg-purple-800"
              : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-sm text-center ${
              selectedCategory === null
                ? "text-white font-semibold"
                : "text-gray-700"
            }`}
          >
            Alle
          </Text>
        </Pressable>

        {/* Category chips */}
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            className={`h-[20px] w-[80px] rounded ${
              selectedCategory === cat
                ? "bg-purple-800"
                : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-sm text-center ${
                selectedCategory === cat
                  ? "text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
      {items && items.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2} 
          className="flex-1 w-full items-center"
          contentContainerClassName="flex-1"
          onRefresh={() => console.log("refreshing")}
          refreshing={false}
        />
      ) : (
        <Text className="text-center mt-4"> Keine Schnittmuster gefunden 😢</Text>
      )}
    </View>
  );
}
