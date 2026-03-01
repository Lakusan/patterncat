import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import BaseModal from "@/src/components/modals/BaseModal";
import { useTheme } from "@/src/contexts/use-theme-context";
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
    const { colors } = useTheme();
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      header={
      <Text style={{ color: colors.text_background }} className="text-center">
        Log In or Create a user account to feel the magic of PATTERN CAT
      </Text>
      }
      footer={
        <Image
          source={require("@/assets/images/patterncat_logo.png")}
          alt="image"
          className="h-[200px] w-full rounded"
          resizeMode="contain"
        />
      }
    >

      <VStack space="lg" className="w-full mt-4">
        <Divider className="bg-current"/>

        <Button
          className="flex-1"
          variant="link"
          onPress={() => {
            onClose();
            onLogin();
          }}
        >
          <ButtonText style={{ color: colors.text_background }}>Log In</ButtonText>
        </Button>

        <Divider className="bg-current"/>

        <Button
          className="flex-1"
          variant="link"
          onPress={() => {
            onClose();
            onRegister();
          }}
        >
          <ButtonText style={{ color: colors.text_background }}>Register</ButtonText>
        </Button>
      </VStack>
    </BaseModal>
  );
}
