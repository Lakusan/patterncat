import { Button, ButtonText } from "@/components/ui/button";
import { FlatList, View } from "react-native";

type FilterButton = {
  id: string;
  label: string;
  onPress: () => void;
  variant?: "solid" | "outline";
};

// TODO: get Filternames from DB while App loads -> inMomory?

const filterButtons: FilterButton[] = [
  { id: "1", label: "Kleider", onPress: () => console.log("Login pressed"), variant: "solid" },
  { id: "2", label: "Hosen", onPress: () => console.log("Signup pressed"), variant: "outline" },
  { id: "3", label: "Oberteile", onPress: () => console.log("Profile pressed"), variant: "solid" },
  { id: "4", label: "Jacken", onPress: () => console.log("Settings pressed"), variant: "outline" },
];

export default function FilterBar() {
  const renderItem = ({ item }: { item: FilterButton }) => (
    <Button
      className="mx-2 flex-1 rounded-lg bg-purple-600"
      variant={item.variant}
      onPress={item.onPress}
      size="xs"
    >
      <ButtonText className="text-white">{item.label}</ButtonText>
    </Button>
  );

  return (
    <View className="w-full p-2">
      <FlatList
        data={filterButtons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      />
    </View>
  );
}
