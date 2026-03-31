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

type ImageSource = string | number;

interface ImageCarouselProps {
  images?: any[] | undefined | null;
}

// Bildschirmbreite holen, um die Scroll-Position zu berechnen
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = [] }) => {
  // Welches Bild ist aktuell sichtbar?
  const [activeIndex, setActiveIndex] = useState(0);

  // Steuert, ob das Fullscreen-Modul geöffnet ist
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Referenz auf den ScrollView, um programmatisch scrollen zu können
  const scrollRef = useRef<ScrollView | null>(null);
  
  // Debug-Ausgabe beim ersten Render
  // useEffect(() => {
  //   console.log(`ImageCarousel Images: ${JSON.stringify(images)}`)
  // }, []);

  // Bereitet die Bildquellen für das Carousel auf
  const displayImages: ImageSource[] = useMemo(() => {
    // Wenn keine Bilder vorhanden sind → Fallback-Bild anzeigen
    if (!images || images.length === 0 || images === null || images === undefined ) {
      return [FALLBACK_IMAGE];
    }

    // Wandelt PatternImage[] in string[] (Signed URLs) um
    return images.map((img) => {
      return img.url;
    });
  }, [images]);

  // Wird ausgelöst, wenn der ScrollView das Scrollen beendet hat
  // Berechnet anhand der Scroll-Position, welches Bild sichtbar ist
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  // Scrollt zu einem bestimmten Bild
  const scrollToIndex = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
    setActiveIndex(index);
  };

  // Navigiert zum nächsten Bild
  const nextImage = () => {
    if (activeIndex < displayImages.length - 1) scrollToIndex(activeIndex + 1);
  };

  // Navigiert zum vorherigen Bild
  const prevImage = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  // Das aktuell sichtbare Bild
  const currentImage = displayImages[activeIndex];

  // React Native Image benötigt entweder { uri: string } oder require(number)
  const currentSource =
    typeof currentImage === "string"
      ? { uri: currentImage }
      : currentImage;

  // Beim ersten Render → immer zum ersten Bild scrollen
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, animated: false });
    setActiveIndex(0);
  }, []);

  // Wenn neue Bilder geladen werden → Carousel zurücksetzen
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, animated: false });
    setActiveIndex(0);
  }, [displayImages]);

  return (
    <Box className="w-full">


      <Box className="w-full h-full overflow-hidden bg-gray-200">
        
        {/* Öffnet Fullscreen beim Tippen */}
        <Pressable className="w-full h-full" onPress={() => setIsFullscreen(true)}>
          
          {/* Horizontal scrollbares Image-Carousel */}
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
                  : img;
                  
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

        {/* Navigation + Bildzähler */}
        {displayImages.length > 1 && (
          <HStack className="absolute bottom-4 left-0 right-0 justify-between px-4 items-center">
            
            {/* Zurück-Button */}
            <Button
              size="md"
              className={`rounded-full bg-white/90 shadow-sm ${activeIndex === 0 ? "opacity-30" : "opacity-100"}`}
              onPress={prevImage}
              disabled={activeIndex === 0}
            >
              <ButtonIcon as={ChevronLeftIcon} color="black" />
            </Button>

            {/* Bildzähler */}
            <Box className="bg-black/50 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">
                {activeIndex + 1} / {displayImages.length}
              </Text>
            </Box>

            {/* Vorwärts-Button */}
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

      {/* Fullscreen Modal */}
      <ImageCarouselFullscreenModal
        visible={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        image={currentSource}
      />
    </Box>
  );
};

export default ImageCarousel;
