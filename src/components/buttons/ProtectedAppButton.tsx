import { AppButton } from "@/src/components/buttons/AppButton";
import { useAuthContext } from "@/src/contexts/use-auth-context";

type ProtectedButtonProps = {
  onAuthenticatedPress: () => void;
  onUnauthenticatedPress?: () => void;
  buttonText: string;
};

export function ProtectedAppButton({
  onAuthenticatedPress,
  onUnauthenticatedPress,
  buttonText
}: ProtectedButtonProps) {
  const { session } = useAuthContext();

  const handlePress = () => {
    if (session) {
      onAuthenticatedPress();
    } else {
      onUnauthenticatedPress?.();
    }
  };

  return (
    <AppButton text={buttonText} onPress={handlePress}></AppButton>
  );
}
