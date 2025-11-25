import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DummyDetails() {
    const { id, name, price, image } = useLocalSearchParams<{ id: string , name: string, price: string, image: string}>();

  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Price: {price}</Text>
      <Text>Image: {image}</Text>
    </View>
  );
}


