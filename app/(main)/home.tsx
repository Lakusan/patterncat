import { HCategoryFilterBar } from "@/src/components/bars/HCategoryFilterBar";
import PublicPatternList from "@/src/components/Lists/PatternList";
import LoadingModal from "@/src/components/modals/LoadingModal";
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { patternService } from "@/src/services/data";
import { PatternListElement } from "@/src/types/patternTypes";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const { userId } = useAuthContext();
    const [patterns, setPattern] = useState<PatternListElement[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);

    // Filter machen, weil die noch nicht gehen. 
    // Detailansicht fertig machen. 

    useEffect(() => {
        async function load() {
            if (!userId) {
                return;
            }
            setLoading(true);
            const patternData = await patternService.getAllPatternListElements(userId);
            if (!patternData) {
                console.warn("Kein Pattern gefunden oder RLS blockiert");
                setPattern([]);
            } else {
                setPattern(patternData);
                const uniqueCategories = patternData.map(
                    p => console.log(`HOME cat: ${(p.category)}`) || p.category

                );
                // setCategories(  ["Alle", ...uniqueCategories]);
            }
            // Simuliere eine Ladezeit von 1 Sekunde, damit der Ladezustand sichtbar ist und 
            // das LoadingModal nicht aufblinkt
            await new Promise(resolve => setTimeout(resolve, 1000))
            setLoading(false);
        }

        load();
    }, [userId]);

    const filteredPatterns = useMemo(() => {
        if (!selectedCategory) return patterns;
        return patterns.filter((p) => p.category === selectedCategory);
    }, [patterns, selectedCategory]);

    if (loading) {
        return (
            <LoadingModal isOpen={loading} message="lade deine Pattern" />
        );
    }
    return (
        <View
            className="flex-1 bg-background lg:max-w-[70%] lg:self-center"
            onLayout={(e) => {
                setContainerWidth(e.nativeEvent.layout.width);
            }}
        >
            <Text className="text-text_secondary">(main)/home</Text>

            <HCategoryFilterBar
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                categories={categories}
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