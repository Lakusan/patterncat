import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Pressable, View } from "react-native";


interface ExpandableTextProps {
  text: string;
  collapsedHeight?: number;
}

export function ExpandableText({
  text,
  collapsedHeight = 24,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="px-4">
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View
          style={{
            maxHeight: expanded ? undefined : collapsedHeight,
            overflow: "hidden",
          }}
        >
          <Text >
            {text}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => setExpanded(!expanded)}>
        <Text >
          {expanded ? "Weniger" : "Mehr"}
        </Text>
      </Pressable>
    </View>
  );
}





