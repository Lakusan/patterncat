// import PublicPatternList from '@/src/components/lists/PublicPatternList';
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, ButtonText } from "@/components/ui/button";
import { Grid, GridItem } from "@/components/ui/grid";
import { AddIcon, RemoveIcon } from '@/components/ui/icon';
import { Text } from "@/components/ui/text";
import ImageCarousel from "@/src/components/images/ImageCarousel";
import { ExpandableText } from "@/src/components/text/ExpandableText";
import { useColorScheme } from "nativewind";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function PublicHome() {
  const { colorScheme, setColorScheme } = useColorScheme();
  console.log(colorScheme)
    return (
      
      // Container Formular
      <View className="flex-1 xl:w-2/3 xl:self-center dark:bg-pink-900">
        <Pressable
          onPress={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
          className="bg-gray-200 dark:bg-gray-700 p-3 rounded-xl"
        >
          <Text className="text-black dark:text-white">
            Switch to {colorScheme === "dark" ? "Light" : "Dark"} Mode
          </Text>
        </Pressable>
        {/* Container Carousel 50% screensize */}
        <Text> Aktuelles Theme: {colorScheme}</Text>
        <View className="flex-row h-1/2 bg-blue-500">
          <ImageCarousel images={[
            "https://picsum.photos/200?random=101",
            "https://picsum.photos/200?random=102",
            "https://picsum.photos/200?random=103"
          ]}>
          </ImageCarousel>
        </View>
        {/* Pattern Profil Scollable */}
        <ScrollView className="flex-1">
          <Grid
            _extra={{ className: "grid-cols-2" }}>
            <GridItem
              className="p-1 shadow-sm"
              _extra={{ className: "col-span-2" }}
            >
              <Text className="text-4xl font-bold">Kleid Nr. 124</Text>
            </GridItem>
            <GridItem
              className="p-1 shadow-sm"
              _extra={{ className: "col-span-2" }}
            >
              <View className="flex-row items-center justify-between">
                <Text>Burdasstyle 09/2024</Text>
                <Text >analog</Text>
              </View>
            </GridItem>
            <GridItem
              className="p-1 shadow-sm"
              _extra={{ className: "col-span-2" }}
            >
              <Text className="text-xs font-semibold">Beschreibung</Text>
              <ExpandableText
                text="Ein kurzes Jäckchen, welches auch gut über einem Kleid getragen werden kann. Satz2: Ein kurzes Jäckchen, welches auch gut über einem Kleid getragen werden kann. Satz3: Ein kurzes Jäckchen, welches auch gut über einem Kleid getragen werden kann."
              />
            </GridItem>
            <GridItem
              className="p-5"
              _extra={{ className: "col-span-2" }}>
              <Accordion className="bg-transparent">
                <AccordionItem value="item-1" className="bg-orange-200 rounded-lg">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            {isExpanded ? (
                              <AccordionIcon as={RemoveIcon} className="mr-3" />
                            ) : (
                              <AccordionIcon as={AddIcon} className="mr-3" />
                            )}
                            <AccordionTitleText>
                              Kategorien
                            </AccordionTitleText>
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      To place an order, simply select the products you want, proceed to
                      checkout, provide shipping and payment information, and finalize
                      your purchase.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="mt-2 bg-orange-200 rounded-lg">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            {isExpanded ? (
                              <AccordionIcon as={RemoveIcon} className="mr-3" />
                            ) : (
                              <AccordionIcon as={AddIcon} className="mr-3" />
                            )}
                            <AccordionTitleText>
                              Material
                            </AccordionTitleText>
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent className="ml-9">
                    <AccordionContentText>
                      We accept all major credit cards, including Visa, Mastercard, and
                      American Express. We also support payments through PayPal.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="mt-2 bg-orange-200 rounded-lg">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            {isExpanded ? (
                              <AccordionIcon as={RemoveIcon} className="mr-3" />
                            ) : (
                              <AccordionIcon as={AddIcon} className="mr-3" />
                            )}
                            <AccordionTitleText>
                              Design
                            </AccordionTitleText>
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent className="ml-9">
                    <AccordionContentText>
                      We accept all major credit cards, including Visa, Mastercard, and
                      American Express. We also support payments through PayPal.
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </GridItem>
            <GridItem
              className="h-10"
              _extra={{ className: "col-span-2" }}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                // onContentSizeChange={(w) => setContentWidth(w)}
                className="flex-row px-2 py-3"
              >
                <Button size="xs" className="m-1">
                  <ButtonText>Tag_1</ButtonText>
                </Button>
                <Button size="xs" className="m-1">
                  <ButtonText>Tag_2</ButtonText>
                </Button>
                <Button size="xs" className="m-1">
                  <ButtonText>Tag_3</ButtonText>
                </Button>
                <Button size="xs" className="m-1">
                  <ButtonText>Tag_4</ButtonText>
                </Button>
                <Button size="xs" className="m-1">
                  <ButtonText>Tag_5</ButtonText>
                </Button>
                <Button size="xs" className="m-1">
                  <ButtonText>Tag_6</ButtonText>
                </Button>
                <Button size="xs" className="m-1">
                  <ButtonText>Tag_7</ButtonText>
                </Button>
              </ScrollView>
            </GridItem>
          </Grid>
        </ScrollView>
        <View className="items-center sm:bg-red-500">
          <Button className="">
            <ButtonText>
              Edit
            </ButtonText>
          </Button>
        </View>
      </View>
      // <PublicPatternList></PublicPatternList>
    );
}
