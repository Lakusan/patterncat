import PatternDetail from "@/src/components/screens/PatternDetails";
import { usePatternStore } from '@/src/store/patternStore';
import { useLocalSearchParams } from "expo-router";


export default function PublicPatternDetails() {
    const { id } = useLocalSearchParams();
    const pattern = usePatternStore(
        (s) => s.patterns.find((p) => p.id === id)
    );
    console.log(pattern)
    return <PatternDetail item={pattern} />;
}       