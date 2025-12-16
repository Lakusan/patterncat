import PatternList from "@/src/components/PatternList";
import SearchBarCustom from "@/src/components/SearchBarCustom";
import { View } from "react-native";

export default function AnonHomeScreen() {
  return (
    <View className="flex-1 p-2">
      <SearchBarCustom
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      />
      <PatternList></PatternList>
    </View>
  );
}