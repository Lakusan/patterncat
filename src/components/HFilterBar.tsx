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
  { id: "1", label: "Login", onPress: () => console.log("Login pressed"), variant: "solid" },
  { id: "2", label: "Signup", onPress: () => console.log("Signup pressed"), variant: "outline" },
  { id: "3", label: "Profile", onPress: () => console.log("Profile pressed"), variant: "solid" },
  { id: "4", label: "Settings", onPress: () => console.log("Settings pressed"), variant: "outline" },
];

export default function FilterBar() {
  const renderItem = ({ item }: { item: FilterButton }) => (
    <Button
      className="mx-2 flex-1 rounded-lg bg-purple-600"
      variant={item.variant}
      onPress={item.onPress}
    >
      <ButtonText className="text-white font-bold">{item.label}</ButtonText>
    </Button>
  );

  return (
    <View className="w-full p-2 bg-red-500">
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
