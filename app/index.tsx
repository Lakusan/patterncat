import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Product, products } from "@/src/constants/products";
import { router } from "expo-router";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";

function ListItem({ item }: { item: Product }) {
  return (
      <TouchableOpacity 
      key={item.id}
                    className={`bg-white rounded-sm p-3 pb-6 mb-6 w-[48%] md:w-[30%] lg:w-[22%] shadow-lg`}
                    onPress={() => {
                      router.push({
                        pathname: "/[id]",
                        params: { id: String(item.id), name: String(item.name),  price: String(item.price), image: String(item.image)}, 
                      })
                    }
                    }>
        <Card className="p-5 rounded-lg flex-1">
          <Image
            source={{
              uri: item.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md"
            alt={`${item.name} image`}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {item.name}
          </Text>
          <Heading size="md" className="mb-4">
            € {item.price}
          </Heading>
        </Card>
        </TouchableOpacity>
  );
}

export default function App() {
  return (
       <ScrollView showsVerticalScrollIndicator={true}>

        <FlatList
          data={products}
          keyExtractor={(item: Product) => item.id}
          contentContainerClassName="gap-2 max-w-[960] mx-auto w-full"
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </ScrollView>
  );
}
