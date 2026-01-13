import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter
} from "@/components/ui/modal";

import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Text } from "react-native";

export type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

export default function AuthRequestModal({
  isOpen,
  onClose,
  onLogin,
  onRegister
}: AuthModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent className="max-w-[375px]">
        <ModalBody>
          <Text className="text-center">
            Log In or Create a user account to feel the magic of PATTERN CAT
          </Text>

          <VStack space="lg" className="w-full mt-4">
            {/* LOGIN BUTTON */}
            <Button
              className="flex-1 bg-purple-500"
              onPress={() => {
                onClose();
                onLogin();
              }}
            >
              <ButtonText>Log In</ButtonText>
            </Button>

            {/* REGISTER BUTTON */}
            <Button
              className="flex-1 bg-purple-500"
              onPress={() => {
                onClose();
                onRegister();
              }}
            >
              <ButtonText>Register</ButtonText>
            </Button>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Image
            source={require("@/assets/images/icon.png")}
            alt="image"
            className="h-[185px] w-full rounded"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
