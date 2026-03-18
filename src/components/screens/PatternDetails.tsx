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
import { HStack } from "@/components/ui/hstack";
import { AddIcon, RemoveIcon } from '@/components/ui/icon';
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ImageCarousel from "@/src/components/images/ImageCarousel";
import { ExpandableText } from "@/src/components/text/ExpandableText";
import { useTheme } from "@/src/contexts/use-theme-context";
import type { Pattern } from "@/src/types/patternTypes";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


interface PatternDetailsProps {
  pattern: Pattern;
}

export default function PatternDetails({ pattern }: PatternDetailsProps) {
  const { colors } = useTheme();
  return (
    // Container Formular
    <View className="flex-1 xl:w-2/3 xl:self-center shadow-sm">
      <View className="flex-row h-[45%]">
        <ImageCarousel images={pattern.images}>
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
            <Text
              style={{ color: colors.text_primary }}
              className="text-4xl font-bold">{pattern.name}</Text>
          </GridItem>
          <GridItem
            className="p-1 shadow-sm"
            _extra={{ className: "col-span-2" }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ color: colors.text_primary }}>{pattern.quelle_marke} {pattern.magazin_monat}/{pattern.magazin_jahr}</Text>
              <Text style={{ color: colors.text_primary }}>{pattern.format}</Text>
            </View>
          </GridItem>
          <GridItem
            className="p-1 shadow-sm"
            _extra={{ className: "col-span-2" }}
          >
            <Text style={{ color: colors.text_primary }} className="text-xs font-semibold">Beschreibung</Text>
            <ExpandableText
              text={pattern.beschreibung}
            />
          </GridItem>
          <GridItem
            className="p-5"
            _extra={{ className: "col-span-2" }}>
            <Accordion className="bg-transparent">
              <AccordionItem value="item-1" className="bg-accent rounded-lg">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => {
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
                    <VStack>
                      <Text>{pattern.kategorie_1}</Text>
                      <Text>{pattern.kategorie_2}</Text>
                    </VStack>
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="mt-2 bg-accent rounded-lg">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => {
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
                    <VStack>
                      <HStack>
                        
                      <Text>Verschluss:</Text>
                      <Text className="">{pattern.verschluss}</Text>
                       
                      </HStack>
                      <Text>Ärmel: {pattern.aermel}</Text>
                      <Text>Ausschnitt: {pattern.ausschnitt}</Text>
                      <Text>Saumlänge: {pattern.saumlaenge}</Text>
                    </VStack>
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
              <Button size="xs" className="m-1 bg-gray-400">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_1</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-gray-400">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_2</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-gray-400">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_3</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-gray-400">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_4</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-gray-400">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_5</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-gray-400">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_6</ButtonText>
              </Button>
              <Button size="xs" className="m-1 bg-gray-400">
                <ButtonText style={{ color: colors.text_secondary }}>Tag_7</ButtonText>
              </Button>
            </ScrollView>
          </GridItem>
        </Grid>
      </ScrollView>
      <View className="items-center">
        <Button className="bg-primary w-60 h-10 m-2">
          <ButtonText style={{ color: colors.text_secondary }}>
            Edit
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}