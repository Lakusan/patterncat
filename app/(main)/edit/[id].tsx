import { AppButton } from "@/src/components/buttons/AppButton";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from 'react-native';

export default function PatternEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
        <Text> PatternID: {id} </Text>
        <AppButton text="Back" onPress={() => router.navigate({
            pathname: "/(main)/details/[id]",
            params: { id: id },
          })}
            ></AppButton>
    </View>
  );
}
