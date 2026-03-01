import { Text } from "@/components/ui/text";
import { useTheme } from "@/src/contexts/use-theme-context";
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
  const { colors } = useTheme();

  return (
    <View className="p-2">
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View
          style={{
            maxHeight: expanded ? undefined : collapsedHeight,
            overflow: "hidden",
          }}
        >
          <Text style={{ color: colors.text_background }} >
            {text}
          </Text>
        </View>
      </Pressable>

      <Pressable className="pt-1" onPress={() => setExpanded(!expanded)}>
        <Text underline={true} className="text-primary">
          {expanded ? "Weniger" : "Mehr"}
        </Text>
      </Pressable>
    </View>
  );
}





