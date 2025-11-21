import AppButton from "@/src/components/CircleButton";
import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import React, { useState } from "react";
import { View } from "react-native";

export default function UserProfile() {
    const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(res => setTimeout(res, 1200));
    setSaving(false);
  };
  return (

    <SafeAreaContainer className="bg-red-500 flex-1">
      <View className="flex-row w-full h-10 bg-green-500">
     <View style={{ flexDirection: 'column', gap: 12 }}>
        <AppButton
          title="Primary Button"
          variant="primary"
          onPress={() => {}}
        />
        <AppButton
          title="Secondary Button"
          variant="secondary"
          onPress={() => {}}
        />
        <AppButton
          title="Outline Button"
          variant="outline"
          onPress={() => {}}
        />
        <AppButton
          title="Disabled Button"
          disabled
          onPress={() => {}}
        />
      </View>
      </View>
    </SafeAreaContainer>
  );
}


