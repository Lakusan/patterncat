import { AppButton } from "@/src/components/buttons/AppButton";
import PatternEditor from "@/src/components/screens/PatternEditor";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from 'react-native';

export default function PatternEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
        <AppButton text="Back" onPress={() => router.navigate({
            pathname: "/(main)/details/[id]",
            params: { id: id },
          })}
            ></AppButton>
            <PatternEditor></PatternEditor>
    </View>
  );
}
