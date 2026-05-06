import { HCategoryFilterBar } from '@/src/components/bars/HCategoryFilterBar';
import PublicPatternList from '@/src/components/Lists/PublicPatternList';
import { publicListPatterns } from '@/src/constants/dummyListPattern';

import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

export default function PublicHome() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const filteredPatterns = useMemo(() => {
    if (!selectedCategory) return publicListPatterns;
    return publicListPatterns.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <View
      className="flex-1 bg-background lg:max-w-[70%] lg:self-center"
      onLayout={(e) => {
        setContainerWidth(e.nativeEvent.layout.width);
      }}
    >
      <Text>public</Text>

      <HCategoryFilterBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {containerWidth > 0 && filteredPatterns.length > 0 ? (
        <PublicPatternList patterns={filteredPatterns} width={containerWidth} />
      ) : (
        <Text className="text-center mt-4 text-text_primary">
          Keine Schnittmuster der Kategorie {selectedCategory} gefunden 😢
        </Text>
      )}
    </View>
  );
}
