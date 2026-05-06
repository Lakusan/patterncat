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
import { Text } from "@/components/ui/text";
import { ExpandableText } from "@/src/components/text/ExpandableText";
import { useTheme } from "@/src/contexts/use-theme-context";
import type { Pattern } from "@/src/types/patternTypes";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ImageCarousel } from "../images/ImageCarousel";


interface PatternDetailsProps {
  pattern: Pattern;
}

export default function PatternDetails({ pattern }: PatternDetailsProps) {
  const { colors } = useTheme();
  return (
    // Container Formular
    <View className="flex-1 xl:w-2/3 xl:self-center shadow-sm bg-background">
      <View className="flex-row h-[45%]">
        <ImageCarousel images={pattern.images}>
        </ImageCarousel>
      </View>
      {/* Pattern Profile Scollable */}
      <ScrollView className="flex-1">
        <Grid
          _extra={{ className: "grid-cols-2" }}>
          {/* Title */}
          <GridItem
            className="p-1"
            _extra={{ className: "col-span-2" }}
          >
            <Text
              style={{ color: colors.text_primary }}
              className="text-4xl font-bold">{pattern.name}</Text>
          </GridItem>
          {/* Source & Format */}
          <GridItem
            className="p-1 shadow-sm shadow-secondary"
            _extra={{ className: "col-span-2" }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ color: colors.text_primary }}>{pattern.quelle_marke} {pattern.magazin_monat}/{pattern.magazin_jahr}</Text>
              <Text style={{ color: colors.text_primary }}>{pattern.format}</Text>
            </View>
          </GridItem>
          {/* Description */}
          <GridItem
            className="p-1 shadow-sm shadow-secondary"
            _extra={{ className: "col-span-2" }}
          >
            <Text style={{ color: colors.text_primary }} className="text-xs font-semibold">Beschreibung</Text>
            <ExpandableText
              text={pattern.beschreibung}
            />
          </GridItem>
          {/* Accordeon */}
          <GridItem
            className="shadow-sm shadow-secondary"
            _extra={{ className: "col-span-2" }}>
            <Text style={{ color: colors.text_primary }} className="text-xs font-semibold pt-1 pl-1 ">Eigenschaften</Text>
            <Accordion className="bg-transparent py-3 px-2">

              <AccordionItem value="item-1" className="bg-accent rounded-lg">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => {
                      return (
                        <>
                          <AccordionTitleText className="font-normal">
                            Kategorien
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronLeft} className="ml-3" stroke={colors.primary} />
                          ) : (
                            <>
                              <Text className="text-primary">Details</Text>
                              <AccordionIcon as={ChevronRight} className="ml-3" stroke={colors.primary} />
                            </>
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <AccordionContentText>
                    <View className="flex-row w-full justify-around">
                      <Text>{pattern.kategorie_1}</Text>
                      <Text>{pattern.kategorie_2}</Text>
                    </View>
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="mt-2 bg-accent rounded-lg">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => {
                      return (
                        <>
                          <AccordionTitleText className="font-normal">
                            Material
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronLeft} className="ml-3" stroke={colors.primary} />
                          ) : (
                            <>
                              <Text className="text-primary">Details</Text>
                              <AccordionIcon as={ChevronRight} className="ml-3" stroke={colors.primary} />
                            </>
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="ml-9">
                  <AccordionContentText>
                    {pattern.materials}
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="mt-2 bg-accent rounded-lg">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => {
                      return (
                        <>
                          <AccordionTitleText className="font-normal">
                            Design
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronLeft} className="ml-3" stroke={colors.primary} />
                          ) : (
                            <>
                              <Text className="text-primary">Details</Text>
                              <AccordionIcon as={ChevronRight} className="ml-3" stroke={colors.primary} />
                            </>
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <View className="">
                    <View className="flex-row justify-around">
                      <Text>Verschluss:</Text>
                      <Text className="">{pattern.verschluss}</Text>
                    </View>
                    <View className="flex-row justify-around">
                      <Text>Ärmel: </Text>
                      <Text>{pattern.aermel}</Text>
                    </View>
                    <View className="flex-row justify-around">
                      <Text>Ausschnitt: </Text>
                      <Text>{pattern.ausschnitt}</Text>
                    </View>
                    <View className="flex-row justify-around">
                      <Text>Saumlänge: </Text>
                      <Text>{pattern.saumlaenge}</Text>
                    </View>
                  </View>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </GridItem>
          {/* Tags */}
          <GridItem
            _extra={{ className: "col-span-2" }}
          >
            <Text style={{ color: colors.text_primary }} className="text-xs font-semibold pt-1 pl-1">Tags</Text>
            <View
              className="flex-row flex-wrap px-2 py-1"
            >
              <Button size="xs" className="m-1 bg-secondary rounded-full">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_1</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-secondary rounded-full">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_2</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-secondary rounded-full">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_3</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-secondary rounded-full">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_4</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-secondary rounded-full">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_5</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-secondary rounded-full">
                <ButtonText style={{ color: colors.text_secondary }}>TAG_6890890103984geh</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-secondary rounded-full">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_7</ButtonText>
              </Button>
            </View>
          </GridItem>
          {/* Footer */}
          <GridItem
            _extra={{ className: "col-span-2"}}
          >
           <View className="items-center justify-center">
            <Button className="bg-primary m-2 w-72">
              <ButtonText style={{ color: colors.text_secondary }}>
                Edit
              </ButtonText>
            </Button>
            </View>
          </GridItem>
        </Grid>
      </ScrollView>
    </View>
  );
}