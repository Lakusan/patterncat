import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { FlatList, View } from "react-native";

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
      {items && items.length > 0 ? (
        <FlatList
          data={items}
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


