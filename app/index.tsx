import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
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
        <Text className="text-white">Content</Text>
      </View>
    </SafeAreaContainer>
  );
}


