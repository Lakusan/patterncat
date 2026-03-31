import { useTheme } from "@/src/contexts/use-theme-context";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface ExpandableTextProps {
  text: string | null;
}

export function ExpandableText({ text }: ExpandableTextProps) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const [fullHeight, setFullHeight] = useState(0);
  const [singleLineHeight, setSingleLineHeight] = useState(0);
  const [measured, setMeasured] = useState(false);

  if (!text || text.trim().length === 0) {
    return null;
  }

  const isOverflowing = fullHeight > singleLineHeight;

  return (
    <View className="p-2">

      {/* 1. Unsichtbarer Text → misst volle Höhe */}
      {!measured && (
        <Text
          style={{ position: "absolute", opacity: 0, color: colors.text_primary }}
          onLayout={(e) => setFullHeight(e.nativeEvent.layout.height)}
        >
          {text}
        </Text>
      )}

      {/* 2. Unsichtbarer Text → misst Höhe einer Zeile */}
      {!measured && (
        <Text
          style={{ position: "absolute", opacity: 0, color: colors.text_primary }}
          numberOfLines={1}
          onLayout={(e) => {
            setSingleLineHeight(e.nativeEvent.layout.height);
            setMeasured(true);
          }}
        >
          {text}
        </Text>
      )}

      {/* 3. Sichtbarer Text */}
      <Pressable
        disabled={!isOverflowing}
        onPress={() => setExpanded(!expanded)}
      >
        <Text
          style={{ color: colors.text_primary }}
          numberOfLines={expanded ? undefined : 1}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </Pressable>

      {/* 4. Mehr/Weniger Button */}
      {isOverflowing && (
        <Pressable className="pt-1" onPress={() => setExpanded(!expanded)}>
          <Text className="text-primary underline font-bold">
            {expanded ? "Weniger" : "Mehr"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
