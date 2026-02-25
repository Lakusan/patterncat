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
import { Grid, GridItem } from "@/components/ui/grid";
import { Text } from "@/components/ui/text";
import { ExpandableText } from "@/src/components/text/ExpandableText";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { Divider } from '@/components/ui/divider';
import { Button, ButtonText } from "@/components/ui/button";
import { AddIcon, RemoveIcon } from '@/components/ui/icon';
import ImageCarousel from "@/src/components/images/ImageCarousel";

export default function PublicHome() {
  return (
    // Container Formular
    <View className="flex-1 xl:w-2/3 xl:self-center">
      {/* Container Carousel 50% screensize */}
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
            className="p-1 border"
            _extra={{ className: "col-span-2" }}
          >
            <Text className="text-4xl font-bold">Kleid Nr. 124</Text>
          </GridItem>
          <GridItem
            className="p-1 border bg-green-500"
            _extra={{ className: "col-span-1" }}
          >
            <Text className="">Burdasstyle 09/2024</Text>
          </GridItem>
          <GridItem
            className="border  text-right p-1"
            _extra={{ className: "col-span-1 " }}
          >
            <Text className="">analog</Text>
          </GridItem>
          <GridItem
            className="bg-red-500 p-6 rounded-md"
            _extra={{ className: "col-span-2" }}
          >
            <Text className="text-xs font-semibold">Beschreibung</Text>
            <ExpandableText
              text="at TypeScriptParserMixin.parseUpdate (D:\!_Code\js\patterncat\node_modules\@babel\parser\lib\index.js:11066:21)
    at TypeScriptParserMixin.parseMaybeUnary (D:\!_Code\js\patterncat\node_modules\@babel\parser\lib\index.js:11046:23)
    at TypeScriptParserMixin.parseMaybeUnary (D:\!_Code\js\patterncat\node_modules\@babel\parser\lib\index.js:9837:18)
    at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (D:\!_Code\js\patterncat\node_modules\@babel\parser\lib\index.js:
10899:61)
    at TypeScriptParserMixin.parseExprOps (D:\!_Code\js\patterncat\node_modules\@babel\parser\lib\index.js:10904:23)
    at TypeScriptParserMixin.parseMaybeConditional (D:\!_Code\js\patterncat\node_modules\@babel\parser\lib\index.js:108"
            />
          </GridItem>
          <GridItem
            _extra={{ className: "col-span-2" }}>
            <Accordion className="p-1">
              <AccordionItem value="item-1" className="">
                <AccordionHeader>
                  <AccordionTrigger className="hover:bg-red-500">
                    {({ isExpanded }) => {
                      return (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} className="mr-3" />
                          ) : (
                            <AccordionIcon as={AddIcon} className="mr-3" />
                          )}
                          <AccordionTitleText>
                            How do I place an order?
                          </AccordionTitleText>
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="ml-9">
                  <AccordionContentText>
                    To place an order, simply select the products you want, proceed to
                    checkout, provide shipping and payment information, and finalize
                    your purchase.
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="mt-5">
                <AccordionHeader>
                  <AccordionTrigger className="focus:web:rounded-lg">
                    {({ isExpanded }) => {
                      return (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} className="mr-3" />
                          ) : (
                            <AccordionIcon as={AddIcon} className="mr-3" />
                          )}
                          <AccordionTitleText>
                            What payment methods do you accept?
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
            className="bg-red-500 h-10"
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
