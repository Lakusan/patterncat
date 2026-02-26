// src/components/image/ImageCarouselFullscreenModal.tsx
import { Box } from "@/components/ui/box";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import React from "react";
import { Modal, Pressable } from "react-native";

type ImageSource = string | number;

interface ImageCarouselFullscreenModalProps {
  visible: boolean;
  onClose: () => void;
  image: ImageSource;
}

export const ImageCarouselFullscreenModal: React.FC<ImageCarouselFullscreenModalProps> = ({
  visible,
  onClose,
  image,
}) => {
  // Quelle je nach Typ (URL-String oder require-Asset), weil einzelbild als FallBack -> Dummy
  const source =
    typeof image === "string" ? { uri: image } : image;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Box className="flex-1 bg-black/90 justify-center items-center">
        {/* Close-Button */}
        <Pressable
          onPress={onClose}
          className="absolute top-12 right-6 z-50 p-3 bg-white/20 rounded-full"
        >
          <Icon as={CloseIcon} size="xl" color="white" />
        </Pressable>

        {/* Vollbild-Bild */}
        <Image
          source={source}
          alt="Fullscreen view"
          className="w-full h-full"
          resizeMode="center"
        />
      </Box>
    </Modal>
  );
};
