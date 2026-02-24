import { Grid, GridItem } from "@/components/ui/grid";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import SafeAreaContainer from "@/src/components/container/SafeAreaContainer";
import SmartGallery from "@/src/components/images/ImageCarousel";
import LoadingModal from "@/src/components/modals/LoadingModal";
import { ExpandableText } from "@/src/components/text/ExpandableText";
import { ScrollView, View } from "react-native";

export default function PatternDetails() {
    const loading = false;

    if (loading) {
        return (
            <LoadingModal
                isOpen={loading}
                message="Lade deine Schnittmuster..."
            />
        );
    }

    return (
        <SafeAreaContainer>
            <View className="flex-1 items-center justify-center">
                <View className="flex-1 lg:w-[70%] w-full h-full shadow-lg">

                    {/* --- TOP: IMAGE (fixed 50%) --- */}
                    <View className="h-1/2 w-full bg-blue-500">
                        <SmartGallery 
                            images={[
                                "https://picsum.photos/200?random=101",
                                "https://picsum.photos/200?random=102",
                                "https://picsum.photos/200?random=103",
                            ]}
                        />
                    </View>


                    {/* --- SCROLLABLE CONTENT (bottom 50%) --- */}
                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{ paddingBottom: 40 }}
                    >
                        <View className="px-4 pt-4">

                            <Grid className="gap-1" _extra={{ className: "grid-cols-2" }}>
                                <GridItem
                                    className="bg-red-500 p-6 rounded-md"
                                    _extra={{ className: "col-span-2" }}
                                >
                                    <Text className="text-4xl font-bold">Kleid Nr. 124</Text>
                                </GridItem>


                                <GridItem className="bg-red-500 p-6 rounded-md" _extra={{ className: "col-span-1" }}>
                                    <Text className="text-lg font-semibold">Burdastyle 09/2024</Text>
                                </GridItem>

                                <GridItem className="bg-red-500 p-6 rounded-md" _extra={{ className: "col-span-1" }}>
                                    <Text className="text-lg font-semibold">analog</Text>
                                </GridItem>

                                <GridItem
                                    className="bg-red-500 p-6 rounded-md"
                                    _extra={{ className: "col-span-2" }}
                                >
                                    <Text className="text-xs font-semibold">Beschreibung</Text>
                                    <ExpandableText
                                        text="Dies ist ein sehr langer Text, der normalerweise abgeschnitten wird, aber bei Klick auf 'Mehr anzeigen' vollständig sichtbar wird. Dies ist ein sehr langer Text, der normalerweise abgeschnitten wird, aber bei Klick auf 'Mehr anzeigen' vollständig sichtbar wird..."
                                    />
                                </GridItem>

                                <GridItem
                                    className="bg-red-500 p-6 rounded-md"
                                    _extra={{ className: "col-span-2" }}
                                >
                                    <VStack>
                                        <Text className="text-xs font-semibold">Größen</Text>
                                        <Text className="text-lg font-semibold">Damengrößen</Text>
                                    </VStack>
                                </GridItem>

                                <GridItem
                                    className="bg-red-500 p-6 rounded-md"
                                    _extra={{ className: "col-span-2" }}
                                >
                                    <Text className="text-lg font-semibold">ACCORDEON</Text>
                                </GridItem>

                                <GridItem
                                    className="bg-red-500 p-6 rounded-md"
                                    _extra={{ className: "col-span-2" }}
                                >
                                    <Text className="text-lg font-semibold">HSTACK TAGS</Text>
                                </GridItem>

                                <GridItem
                                    className="bg-red-500 p-6 rounded-md"
                                    _extra={{ className: "col-span-2" }}
                                >
                                    <Text className="text-lg font-semibold">Button</Text>
                                </GridItem>
                            </Grid>

                        </View>
                    </ScrollView>

                </View>
            </View>
        </SafeAreaContainer>
    );
}
