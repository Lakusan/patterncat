import PatternCard from "@/src/components/cards/PatternCard";
import { PatternListElement } from "@/src/types/patternTypes";
import { FlatList } from "react-native";


type Props = {
  patterns: PatternListElement[];
  width: number;
};

export default function PublicPatternList({ patterns, width }: Props) {
const GAP = 12;
const MIN_CARD_WIDTH = 200;
const MAX_CARD_HEIGHT = 300;
const MIN_COLUMS = 2;

  const numColumns = Math.max(
    MIN_COLUMS,
    Math.floor(width / (MIN_CARD_WIDTH + GAP))
  );
  const cardWidth = (width - GAP * (numColumns + 1)) / numColumns;
  return (
    <FlatList
      data={patterns}
      keyExtractor={(p) => p.id}
      numColumns={numColumns}
      key={numColumns} // wichtig: neu rendern bei Änderung der Spaltenanzahl
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: GAP,
      }}
      columnWrapperStyle={{
        gap: GAP,
        marginBottom: GAP,
      }}
      
      renderItem={({ item }) => (
        <PatternCard
        pattern={item}
        width={cardWidth}
        height={MAX_CARD_HEIGHT}
        />
      )}
    />
  );
}
