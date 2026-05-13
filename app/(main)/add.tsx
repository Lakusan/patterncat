import RadioButton from "@/src/components/buttons/RadioButton";
import React, { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";


type SectionVariant = "textInput" | "radiobutton" | "form" | "list";

interface SectionCardProps {
  label: string;
  children: ReactNode;
  variant?: SectionVariant;
}

function SectionCard({ label, children, }: SectionCardProps) {
    // Hier dann switch einbauen wenn ich varianten einbauen will
  return (
    <View className="bg-pink-500">
      
      <Text className="text-xs font-semibold pt-1 pl-1">
        {label}
      </Text>
      <View className="bg-white m-2">
        {children}
      </View>
    </View>
  );
}

export default function Add() {
  return (
    <ScrollView className="flex-1 flex-col bg-red-500">
      <Text>MAIN: add</Text>

      <View className="bg-green-500 flex min-h-[400px]">
        <SectionCard label="string">
        <RadioButton id={""}></RadioButton>
        </SectionCard>
      </View>

      <View className="bg-yellow-500 flex min-h-10">
        <Text>Container 2</Text>
      </View>

      <View className="bg-blue-500 flex-3">
        <Text>Container 3</Text>
      </View>
    </ScrollView>
  );
}
