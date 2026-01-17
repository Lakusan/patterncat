import { Pattern } from '@/src/types/patternTypes';
import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("window");


export default function PatternDetail({ item }: { item: Pattern }) {
  const [expanded, setExpanded] = useState(false);

  if (!item) {
    return (
      <View className="p-5">
        <Text>No item data provided.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* PRODUCT IMAGE GALLERY */}
      {/* <PatternImageGalery images={images}/> */}

      {/* Title */}
      <Text className="text-3xl font-bold mt-4 mx-4">{item.title}</Text>

      {/* Category */}
      <Text className="text-base text-gray-500 mx-4 mt-1">
        {item.category}
      </Text>

      {/* Description */}
      <View className="mx-4 mt-4 mb-10">
        <Text
          className="text-base"
          numberOfLines={expanded ? undefined : 3}
        >
          {item.description}
        </Text>

        <Pressable onPress={() => setExpanded(!expanded)}>
          <Text className="text-purple-600 font-semibold mt-1">
            {expanded ? "Show less" : "More"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
