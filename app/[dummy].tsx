import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DummyDetails() {
    const { id, name } = useLocalSearchParams<{ id: string , name: string}>();

  return (
    <View>
      <Text>Article ID: {id}</Text>
      <Text>Article Name: {name}</Text>
    </View>
  );
}


