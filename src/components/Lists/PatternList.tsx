import { Text } from "@/components/ui/text";
import SafeAreaContainer from '@/src/components/container/SafeAreaContainer';
import { CATEGORIES } from '@/src/constants/dev';
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { patternService } from "@/src/services/data";
import type { PatternListElement } from '@/src/types/patternTypes';
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, useWindowDimensions, View } from 'react-native';
import { FlatList } from "react-native-gesture-handler";

const MIN_CARD_WIDTH = 500;
const MIN_CARD_WIDTH_WEB = 150;
const MIN_CARD_HEIGHT = 200;
const GAP = 15;
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 6;


// spinner for loading
// Get Categories from supabase -> Generate shrotfilter
// load pattern elements meta data and images 

export default function PatternList() {
    const [patterns, setPatterns] = useState<PatternListElement[]>([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useAuthContext();

    useEffect(() => {
        async function load() {
            try {
                const data = await patternService.getAllPatternListElements(userId ?? "");
                setPatterns(data);
            } catch (err) {
                console.error("Fehler beim Laden der Patterns:", err);
            } finally {
                setLoading(false);
            }
        }

        if (userId) {
            load();
        }
    }, [userId]);



    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { width, height } = useWindowDimensions();
    const minWidth = Platform.select({
        native: () => MIN_CARD_WIDTH,
        default: () => MIN_CARD_WIDTH_WEB,
    })();

    const contentWidth = width * (Platform.OS === "web" ? 0.7 : 1);

    const numColumns = Math.min(
        MAX_COLUMNS,
        Math.max(MIN_COLUMNS, Math.floor(contentWidth / (minWidth + GAP)))
    );
    const usableWidth = contentWidth - GAP * 2;
    const cardWidth = usableWidth / numColumns - GAP;
    const aspectRatio = 1.35;
    const cardHeight = Math.max(MIN_CARD_HEIGHT, cardWidth * aspectRatio);

    const filteredPatterns = useMemo(() => {
        // if (!selectedCategory) return patterns;
        // return patterns.filter((p) => p.kategorie_1 === selectedCategory);
        return patterns
    }, [patterns, selectedCategory]);

    const renderCard = ({ item: pattern }: { item: any }) => (
        <View
            style={{ width: cardWidth, minHeight: cardHeight }}
            className="bg-white rounded-xl overflow-hidden"
        >
            <Pressable
                className="flex-1"
                onPress={() =>
                    router.push({
                        pathname: "/(main)/[id]",
                        params: { id: pattern.id },
                    })
                }
            >
                {/* Bild: exakt 50% der Card-Höhe */}
                {/* <Image
                    source={
                        pattern?.images?.[0]?.dateiname
                            ? { uri: pattern.images[0].dateiname }
                            : ImageDummyPattern
                    }
                    resizeMode="cover"
                    className="w-full h-[50%]"
                /> */}

                {/* Content */}
                <View className="p-3 flex-1">
                    <Text className="font-semibold text-lg line-clamp-1">
                        {pattern.name}
                    </Text>

                    <Text className="text-gray-600 mt-1 line-clamp-2">
                        {pattern.beschreibung}
                    </Text>
                </View>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaContainer>
            < View className="flex-1 items-center bg-red-500">
                <View className="flex-1 lg:w-[70%] w-full h-full shadow-lg">

                    {/* Filterbar */}
                    <View className="flex-row justify-around lg:p-0 p-2 lg:h-[3%] h-[5%]">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat || (cat === "Alle" && selectedCategory === null);
                            return (
                                <Pressable
                                    key={cat}
                                    onPress={() =>
                                        setSelectedCategory(cat === "Alle" ? null : cat)
                                    }
                                    className={`
                                        flex-1 flex-shrink justify-center items-center rounded m-1
                                        ${isActive ? "bg-purple-800" : "bg-gray-200"}
                                        `}
                                        >
                                    <Text
                                        className={`text-md ${isActive ? "text-white font-semibold" : "text-gray-700"}`}
                                    >
                                        {cat}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    {filteredPatterns.length > 0 ? (
                        <FlatList
                            data={filteredPatterns}
                            renderItem={renderCard}
                            keyExtractor={(patterns) => patterns.id}
                            showsVerticalScrollIndicator={false}
                            key={numColumns}
                            numColumns={numColumns}
                            columnWrapperStyle={{
                                gap: GAP,
                                justifyContent: "center",
                                paddingBottom: 20,
                            }}
                            contentContainerStyle={{
                                padding: GAP,
                            }}
                        ></FlatList>
                    ) : (
                        <Text className="bg-red-500 text-center mt-4">
                            Keine Schnittmuster gefunden 😢
                        </Text>
                    )}
                </View>
            </View>
        </SafeAreaContainer>
    );
}
