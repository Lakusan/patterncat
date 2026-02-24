import { Box } from '@/components/ui/box';
import { Button, ButtonIcon } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import React, { useState } from 'react';
import { Dimensions, Modal, Pressable } from 'react-native';

import FALLBACK_IMAGE from '@/assets/images/patterncat_dummy_pattern_image.png';

// Modal ion gluestack modal
// fallback dummy image statisch einbinden
// modal auslagern -> ImageGaleryFullScreenModal
// Kommentieren
const { width: SCREEN_WIDTH } = Dimensions.get('window');
interface ImageGalleryProps {
  images: string[];
}

const SmartGallery = ({ images = [] }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [errorImages, setErrorImages] = useState<{ [key: number]: boolean }>({});

  // Sicherheit: Fallback wenn Array leer ist
  console.log(images.length)
  const displayImages = images.length > 0 ? images : [FALLBACK_IMAGE];

  const handleImageError = (index: number) => {
    setErrorImages((prev) => ({ ...prev, [index]: true }));
  };

  const nextImage = () => {
    if (activeIndex < displayImages.length - 1) setActiveIndex(activeIndex + 1);
  };

  const prevImage = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const currentImageUri = errorImages[activeIndex] 
    ? FALLBACK_IMAGE 
    : displayImages[activeIndex];

  // Vollbild-Modal Komponente
  const FullscreenModal = () => (
    <Modal visible={isFullscreen} transparent={false} animationType="slide">
      <Box className="flex-1 bg-black justify-center items-center">
        <Pressable 
          onPress={() => setIsFullscreen(false)}
          className="absolute top-12 right-6 z-50 p-3 bg-white/20 rounded-full"
        >
          <Icon as={CloseIcon} size="xl" color="white" />
        </Pressable>
        <Image
          source={{ uri: currentImageUri }}
          alt="Fullscreen view"
          className="w-full h-full"
          style={{ resizeMode: 'contain' }}
        />
      </Box>
    </Modal>
  );

  return (
    <Box className="w-full p-2">
      <Box className="w-full h-72 rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
        {/* Hauptbild */}
        <Pressable onPress={() => setIsFullscreen(true)} className="w-full h-full">
          <Image
            source={{ uri: currentImageUri }}
            alt={`Gallery Image ${activeIndex}`}
            className="w-full h-full"
            style={{ resizeMode: 'cover' }}
            onError={() => handleImageError(activeIndex)}
          />
        </Pressable>

        {/* Carousel Steuerung (Nur wenn > 1 Bild) */}
        {displayImages.length > 1 && (
          <>
            {/* Navigations Buttons */}
            <HStack className="absolute bottom-4 left-0 right-0 justify-between px-4 items-center">
              <Button
                size="md"
                className={`rounded-full bg-white/90 shadow-sm ${activeIndex === 0 ? 'opacity-30' : 'opacity-100'}`}
                onPress={prevImage}
                disabled={activeIndex === 0}
              >
                <ButtonIcon as={ChevronLeftIcon} color="black" />
              </Button>

              {/* Counter Anzeige */}
              <Box className="bg-black/50 px-3 py-1 rounded-full">
                <Box>
                   <Box className="text-white text-xs font-bold">
                     {activeIndex + 1} / {displayImages.length}
                   </Box>
                </Box>
              </Box>

              <Button
                size="md"
                className={`rounded-full bg-white/90 shadow-sm ${activeIndex === displayImages.length - 1 ? 'opacity-30' : 'opacity-100'}`}
                onPress={nextImage}
                disabled={activeIndex === displayImages.length - 1}
              >
                <ButtonIcon as={ChevronRightIcon} color="black" />
              </Button>
            </HStack>
          </>
        )}
      </Box>

      {/* Fullscreen Overlay */}
      <FullscreenModal />
    </Box>
  );
};

export default SmartGallery;