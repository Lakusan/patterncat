import PatternDetail from "@/src/components/screens/PatternDetails";
import { useLocalSearchParams } from "expo-router";


type Item = {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
};

export default function PublicPatternDetails() {
    const { id, item } = useLocalSearchParams();
    const parsedItem = JSON.parse(item as string);
    return <PatternDetail item={parsedItem} />;
}