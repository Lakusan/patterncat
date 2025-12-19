import PatternList from "@/src/components/PatternList";
import SearchBarCustom from "@/src/components/SearchBarCustom";
import { Text, View } from "react-native";

export default function PublicMobileHomeScreen() {
  return (
    <View className="flex-1 p-2">
      <Text> (public) Index Web Version </Text>
      <SearchBarCustom
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      />
      <PatternList></PatternList>
    </View>
  );
}