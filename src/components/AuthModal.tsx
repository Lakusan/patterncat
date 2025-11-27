import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";

import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from "react-native";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthRequest({ isOpen, onClose }: AuthModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="max-w-[375px]">
        {/* TODO: Images anders einbinden */}
        <ModalHeader>
          <Text className="text-center"> Patterncat ist traurig 😭</Text>
          <ModalCloseButton className="bg-red-500" />
        </ModalHeader>
        <Image
          source={require("@/assets/images/icon.png")}
          alt="image"
          className="h-[185px] w-full rounded"
        />
        <ModalBody>
          <Text>
            Um den vollen umfang dieser APP zu nutzen, melde dich an oder Registriere  dich
          </Text>
          <Text className="text-center">  </Text>
        </ModalBody>
        <ModalFooter>
          <HStack space="lg" className="w-full">
            <Button className="flex-1 bg-purple-500">
              <ButtonText>Login</ButtonText>
            </Button>
            <Button className="flex-1 bg-purple-500">
              <ButtonText>Registrieren</ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
