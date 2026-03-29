import { Text } from "@/components/ui/text";
import { CATEGORIES } from "@/src/constants/dev";
import { Pressable, ScrollView } from "react-native";

type Props = {
  selected: string | null;
  onSelect: (cat: string | null) => void;
  categories?: string[];
};

export function HCategoryFilterBar({ selected, onSelect, categories }: Props) {
  const allCategories = categories || CATEGORIES;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row shrink-0 grow-0 h-10 w-full">
      {allCategories.map((cat) => {
          const isActive = selected === cat || (cat === "Alle" && selected === null);

          return (
            <Pressable
              key={cat}
              onPress={() => onSelect(cat === "Alle" ? null : cat)}
              className={`m-1 w-[100px] justify-center items-center rounded ${isActive ? "bg-primary" : "bg-secondary"
                }`}
            >
              <Text
                className={`text-md ${isActive ? "font-semibold text-text_secondary" : "text-text_secondary"
                  }`}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
    </ScrollView>
  );
}
