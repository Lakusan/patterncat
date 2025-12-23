import PatternList from "@/src/components/PatternList";
import SearchBarCustom from "@/src/components/SearchBarCustom";
import { View } from "react-native";

export default function Public() {
  return (
    <View className="items-center bg-green-500">
      <View className="flex-1 p-2 w-2/3 bg-blue-500">
        <SearchBarCustom
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        />
        <PatternList></PatternList>
      </View>
    </View>
  );
}
