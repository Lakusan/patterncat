import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import BaseModal from "@/src/components/modals/BaseModal";
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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Image
          source={require("@/assets/images/patterncat_logo.png")}
          alt="image"
          className="h-[185px] w-full rounded"
          resizeMode="contain"
        />
      }
    >
      <Text className="text-center">
        Log In or Create a user account to feel the magic of PATTERN CAT
      </Text>

      <VStack space="lg" className="w-full mt-4">
        <Divider />

        <Button
          className="flex-1"
          variant="link"
          onPress={() => {
            onClose();
            onLogin();
          }}
        >
          <ButtonText>Log In</ButtonText>
        </Button>

        <Divider />

        <Button
          className="flex-1"
          variant="link"
          onPress={() => {
            onClose();
            onRegister();
          }}
        >
          <ButtonText>Register</ButtonText>
        </Button>
      </VStack>
    </BaseModal>
  );
}
