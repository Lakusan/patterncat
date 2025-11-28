import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { FlatList, View } from "react-native";

// 1. Define your data type
type Item = {
    id: string;
    title: string;
    description: string;
    image: string;
};

// 2. Example data
// const items: Item[] = [
//     { id: "1", title: "Pattern 1", description: "Description for pattern 1.", image: "https://picsum.photos/seed/pattern1/300/200" },
//     { id: "2", title: "Pattern 2", description: "Description for pattern 2.", image: "https://picsum.photos/seed/pattern2/300/200" },
//     { id: "3", title: "Pattern 3", description: "Description for pattern 3.", image: "https://picsum.photos/seed/pattern3/300/200" },
//     { id: "4", title: "Pattern 4", description: "Description for pattern 4.", image: "https://picsum.photos/seed/pattern4/300/200" },
//     { id: "5", title: "Pattern 5", description: "Description for pattern 5.", image: "https://picsum.photos/seed/pattern5/300/200" },
//     { id: "6", title: "Pattern 6", description: "Description for pattern 6.", image: "https://picsum.photos/seed/pattern6/300/200" },
//     { id: "7", title: "Pattern 7", description: "Description for pattern 7.", image: "https://picsum.photos/seed/pattern7/300/200" },
//     { id: "8", title: "Pattern 8", description: "Description for pattern 8.", image: "https://picsum.photos/seed/pattern8/300/200" },
//     { id: "9", title: "Pattern 9", description: "Description for pattern 9.", image: "https://picsum.photos/seed/pattern9/300/200" },
//     { id: "10", title: "Pattern 10", description: "Description for pattern 10.", image: "https://picsum.photos/seed/pattern10/300/200" },
//     { id: "11", title: "Pattern 11", description: "Description for pattern 11.", image: "https://picsum.photos/seed/pattern11/300/200" },
//     { id: "12", title: "Pattern 12", description: "Description for pattern 12.", image: "https://picsum.photos/seed/pattern12/300/200" },
//     { id: "13", title: "Pattern 13", description: "Description for pattern 13.", image: "https://picsum.photos/seed/pattern13300/200" },
//     { id: "14", title: "Pattern 14", description: "Description for pattern 14.", image: "https://picsum.photos/seed/pattern14/300/200" },
//     { id: "15", title: "Pattern 15", description: "Description for pattern 15.", image: "https://picsum.photos/seed/pattern15/300/200" },
//     { id: "16", title: "Pattern 16", description: "Description for pattern 16.", image: "https://picsum.photos/seed/pattern16/300/200" },
//     { id: "17", title: "Pattern 17", description: "Description for pattern 17.", image: "https://picsum.photos/seed/pattern17/300/200" },
//     { id: "18", title: "Pattern 18", description: "Description for pattern 18.", image: "https://picsum.photos/seed/pattern18/300/200" },
//     { id: "19", title: "Pattern 19", description: "Description for pattern 19.", image: "https://picsum.photos/seed/pattern19/300/200" },
//     { id: "20", title: "Pattern 20", description: "Description for pattern 20.", image: "https://picsum.photos/seed/pattern20/300/200" },
//     { id: "21", title: "Pattern 21", description: "Description for pattern 21.", image: "https://picsum.photos/seed/pattern21/300/200" },
//     { id: "22", title: "Pattern 22", description: "Description for pattern 22.", image: "https://picsum.photos/seed/pattern22/300/200" },
//     { id: "23", title: "Pattern 23", description: "Description for pattern 23.", image: "https://picsum.photos/seed/pattern23/300/200" },
//     { id: "24", title: "Pattern 24", description: "Description for pattern 24.", image: "https://picsum.photos/seed/pattern24/300/200" },
//     { id: "25", title: "Pattern 25", description: "Description for pattern 25.", image: "https://picsum.photos/seed/pattern25/300/200" },
//     { id: "26", title: "Pattern 26", description: "Description for pattern 26.", image: "https://picsum.photos/seed/pattern26/300/200" },
//     { id: "27", title: "Pattern 27", description: "Description for pattern 27.", image: "https://picsum.photos/seed/pattern27/300/200" },
//     { id: "28", title: "Pattern 28", description: "Description for pattern 28.", image: "https://picsum.photos/seed/pattern28/300/200" },
//     { id: "29", title: "Pattern 29", description: "Description for pattern 29.", image: "https://picsum.photos/seed/pattern29/300/200" },
//     { id: "30", title: "Pattern 30", description: "Description for pattern 30.", image: "https://picsum.photos/seed/pattern30/300/200" },
//     { id: "31", title: "Pattern 31", description: "Description for pattern 31.", image: "https://picsum.photos/seed/pattern31/300/200" },
//     { id: "32", title: "Pattern 32", description: "Description for pattern 32.", image: "https://picsum.photos/seed/pattern32/300/200" },
//     { id: "33", title: "Pattern 33", description: "Description for pattern 33.", image: "https://picsum.photos/seed/pattern33/300/200" },
//     { id: "34", title: "Pattern 34", description: "Description for pattern 34.", image: "https://picsum.photos/seed/pattern34/300/200" },
//     { id: "35", title: "Pattern 35", description: "Description for pattern 35.", image: "https://picsum.photos/seed/pattern35/300/200" },
//     { id: "36", title: "Pattern 36", description: "Description for pattern 36.", image: "https://picsum.photos/seed/pattern36/300/200" },
//     { id: "37", title: "Pattern 37", description: "Description for pattern 37.", image: "https://picsum.photos/seed/pattern37/300/200" },
//     { id: "38", title: "Pattern 38", description: "Description for pattern 38.", image: "https://picsum.photos/seed/pattern38/300/200" },
//     { id: "39", title: "Pattern 39", description: "Description for pattern 39.", image: "https://picsum.photos/seed/pattern39/300/200" },
//     { id: "40", title: "Pattern 40", description: "Description for pattern 40.", image: "https://picsum.photos/seed/pattern40/300/200" },

// ];
const items: Item[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Pattern ${i + 1}`,
  description: `This is a sample description for pattern ${i + 1}.`,
  image: `https://picsum.photos/seed/pattern${i + 1}/300/200`,
}));

export default function PatternList() {
  const renderItem = ({ item }: { item: Item }) => (
    <Card size="sm" className='bg-yellow-500'>
      <Image
        source={{ uri: item.image }}
        className="w-full rounded-md"
        alt="image"
      />
      <Text className="text-sm font-normal mt-2 text-typography-700">
        {item.description}
      </Text>
      <Heading size="md" className="mt-2 bg-teal-500">
        {item.title}
      </Heading>
    </Card>
  );

  return (
    <View className="flex-1 justify-center items-center bg-blue-400">
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2} // 👈 ensures 2 per row
        className='flex-1 w-full items-center'
        contentContainerClassName='flex-1 bg-green-500'
      />
    </View>
  );
}


