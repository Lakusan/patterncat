import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Dummy Data 

// 1. Define a Product type
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: "1", name: "Classic T-Shirt", price: "$29.99", image: "https://picsum.photos/200?random=101" },
  { id: "2", name: "Slim Fit Jeans", price: "$59.99", image: "https://picsum.photos/200?random=102" },
  { id: "3", name: "Leather Jacket", price: "$149.99", image: "https://picsum.photos/200?random=103" },
  { id: "4", name: "Summer Dress", price: "$79.99", image: "https://picsum.photos/200?random=104" },
  { id: "5", name: "Running Sneakers", price: "$99.99", image: "https://picsum.photos/200?random=105" },
  { id: "6", name: "Hoodie", price: "$49.99", image: "https://picsum.photos/200?random=106" },
  { id: "7", name: "Denim Jacket", price: "$89.99", image: "https://picsum.photos/200?random=107" },
  { id: "8", name: "Polo Shirt", price: "$39.99", image: "https://picsum.photos/200?random=108" },
  { id: "9", name: "Chinos", price: "$69.99", image: "https://picsum.photos/200?random=109" },
  { id: "10", name: "Cardigan", price: "$59.99", image: "https://picsum.photos/200?random=110" },
  { id: "11", name: "Maxi Dress", price: "$89.99", image: "https://picsum.photos/200?random=111" },
  { id: "12", name: "Bomber Jacket", price: "$129.99", image: "https://picsum.photos/200?random=112" },
  { id: "13", name: "Tank Top", price: "$19.99", image: "https://picsum.photos/200?random=113" },
  { id: "14", name: "Cargo Pants", price: "$79.99", image: "https://picsum.photos/200?random=114" },
  { id: "15", name: "Formal Shirt", price: "$49.99", image: "https://picsum.photos/200?random=115" },
  { id: "16", name: "Blazer", price: "$159.99", image: "https://picsum.photos/200?random=116" },
  { id: "17", name: "Skirt", price: "$39.99", image: "https://picsum.photos/200?random=117" },
  { id: "18", name: "Sweatpants", price: "$44.99", image: "https://picsum.photos/200?random=118" },
  { id: "19", name: "Ankle Boots", price: "$129.99", image: "https://picsum.photos/200?random=119" },
  { id: "20", name: "Trench Coat", price: "$179.99", image: "https://picsum.photos/200?random=120" },
];


export default function App() {
  // Define a set of rotation classes
  const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-3", "-rotate-3"];
  return (

    <SafeAreaContainer className="bg-red-500 flex-1">
      <View className="flex-row w-full h-10 bg-green-500">
        <View className="w-10 bg-purple-500 items-center justify-center">
          <Text className="text-white">Item 1</Text>
        </View>
        <View className="flex-1 bg-yellow-500 items-center justify-center">
          <Text className="text-black">Item 2</Text>
        </View>
        <View className="w-10 bg-blue-500 items-center justify-center">
          <TouchableOpacity
            className="w-10 bg-blue-500 items-center justify-center"
            onPress={() => console.log("Pressed")}
          >
            <Text className="text-white">Item 3</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 m-2 bg-teal-500 items-center justify-center">
        <View className="flex-1 bg-gray-100 p-3">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              {products.map((item, index) => {
                // Pick a rotation class based on index
                const rotationClass = rotations[index % rotations.length];

                return (
                  <TouchableOpacity
                    key={item.id}
                    className={`bg-white rounded-sm p-3 pb-6 mb-6 w-[48%] md:w-[30%] lg:w-[22%] shadow-lg ${rotationClass}`}
                    onPress={() => {
                          router.push({
          pathname: "/article/[id]",
          params: { id: String(item.id), name: String(item.name) }, // ✅ convert to string
        })
                    }
                  }
                  >
                    <Image
                      source={{ uri: item.image }}
                      className="w-full aspect-[4/3] rounded-sm mb-4"
                      resizeMode="cover"
                    />
                    <Text className="text-center text-sm font-semibold">{item.name}</Text>
                    <Text className="text-center text-green-600 font-bold">{item.price}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaContainer>
  );
}


