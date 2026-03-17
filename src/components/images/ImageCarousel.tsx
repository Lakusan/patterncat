import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView } from "react-native";

import FALLBACK_IMAGE from "@/assets/images/Dummy.jpg";
import { ImageCarouselFullscreenModal } from "@/src/components/images/ImageCarouselFullScreenModal";
import { PatternImage } from "@/src/types/patternTypes";

type ImageSource = string | number;

interface ImageCarouselProps {
  images?: PatternImage[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollRef = useRef<ScrollView | null>(null);

  // 🔥 Vereinheitlichte Bildquellen
  const displayImages: ImageSource[] = useMemo(() => {
    if (!images || images.length === 0) {
      return [FALLBACK_IMAGE]; // lokales Bild
    }

    // PatternImage[] → string[]
    return images.map((img) => img.path);
  }, [images]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
    setActiveIndex(index);
  };

  const nextImage = () => {
    if (activeIndex < displayImages.length - 1) scrollToIndex(activeIndex + 1);
  };

  const prevImage = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const currentImage = displayImages[activeIndex];

  const currentSource =
    typeof currentImage === "string"
      ? { uri: currentImage }
      : currentImage; // number (require)

  // Reset bei erstem Render
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, animated: false });
    setActiveIndex(0);
  }, []);

  // Reset bei neuen Bildern
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, animated: false });
    setActiveIndex(0);
  }, [displayImages]);

  return (
    <Box className="w-full">
      <Box className="w-full h-full overflow-hidden bg-gray-200">
        <Pressable className="w-full h-full" onPress={() => setIsFullscreen(true)}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            scrollEventThrottle={16}
          >
            {displayImages.map((img, index) => {
              const source =
                typeof img === "string"
                  ? { uri: img }
                  : img; // require()

              return (
                <Box key={index} style={{ width: SCREEN_WIDTH }} className="h-full">
                  <Image
                    source={source}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </Box>
              );
            })}
          </ScrollView>
        </Pressable>

        {displayImages.length > 1 && (
          <HStack className="absolute bottom-4 left-0 right-0 justify-between px-4 items-center">
            <Button
              size="md"
              className={`rounded-full bg-white/90 shadow-sm ${activeIndex === 0 ? "opacity-30" : "opacity-100"}`}
              onPress={prevImage}
              disabled={activeIndex === 0}
            >
              <ButtonIcon as={ChevronLeftIcon} color="black" />
            </Button>

            <Box className="bg-black/50 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">
                {activeIndex + 1} / {displayImages.length}
              </Text>
            </Box>

            <Button
              size="md"
              className={`rounded-full bg-white/90 shadow-sm ${
                activeIndex === displayImages.length - 1 ? "opacity-30" : "opacity-100"
              }`}
              onPress={nextImage}
              disabled={activeIndex === displayImages.length - 1}
            >
              <ButtonIcon as={ChevronRightIcon} color="black" />
            </Button>
          </HStack>
        )}
      </Box>

      <ImageCarouselFullscreenModal
        visible={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        image={currentSource}
      />
    </Box>
  );
};

export default ImageCarousel;
