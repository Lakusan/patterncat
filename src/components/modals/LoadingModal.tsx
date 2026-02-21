import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import BaseModal from "@/src/components/modals/BaseModal";
import { Image } from "react-native";

interface LoadingModalProps {
  isOpen: boolean;
  message: string;
  footer?: React.ReactNode;
}

export default function LoadingModal({ isOpen, message, footer }: LoadingModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => {}}
      className="items-center justify-center"
      footer={footer}
    >
      <Image
        source={require("@/assets/images/patterncat_logo.png")}
        style={{ width: 200, height: 200, marginBottom: 20 }}
        resizeMode="cover"
      />

      <Spinner size="large" />

      <Text className="mt-4 text-center text-lg font-medium">
        {message}
      </Text>
    </BaseModal>
  );
}
