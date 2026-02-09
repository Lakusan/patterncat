import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from '@/components/ui/text';
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Divider } from '@/components/ui/divider';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { useAlert } from '@/src/hooks/useAlert';
import { loginSchema, LoginSchema } from "@/src/validation/loginSchema";
import { router } from 'expo-router';

// vlt type -> Interface on basemdal und dann infer und add functions?
type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onPasswordReset: () => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onBack,
  onPasswordReset
}: LoginModalProps) {

  const { signIn } = useAuthContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordShowState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const alert = useAlert();
  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  
  // UI‑Level Await: Die UI ist die Async Boundary für State‑Transitionen
  // und nutzt Promise Propagation aus dem AuthService.

  const onSubmit = async (data: LoginSchema) => {
    try {
      await signIn(
        data.email,
        data.password,
      );
      onClose();
      router.replace("/(main)/home");

    } catch (err: any) {
      if (err?.status === 400 && err?.message === "Invalid login credentials") {
        alert.warning("E-Mail oder Passwort ist falsch.", alert.hide);
        return;
      }

      if (err?.status === 429) {
        alert.warning("Zu viele Versuche. Bitte warte einen Moment.", alert.hide);
        return;
      }

      alert.warning("Ein unbekannter Fehler ist aufgetreten.", alert.hide);
    }

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent className="max-w-[375px]">
        <ModalHeader>
          <Heading className="text-xl font-bold">Login</Heading>
        </ModalHeader>
        <Text className='text-center m-2'>Log In to feel the magic of PATTERN CAT</Text>
        <Divider></Divider>
        <ModalBody className="gap-4">
          {/* <VStack space="xs"></VStack> */}
          {/* EMAIL */}
          <Input className="border border-gray-300 rounded-lg m-2">
            <InputField
              placeholder="Email"
              keyboardType="email-address"
              onFocus={() => clearErrors()}
              onChangeText={(text) => setValue("email", text)}
            />
          </Input>
          {errors.email && (
            <Text className="text-red-500 text-small text-center">{errors.email.message}</Text>
          )}

          {/* PASSWORD */}
          <Input className="border border-gray-300 rounded-lg m-2">
            <InputField
              placeholder="Password"
              onFocus={clearErrors()}
              onChangeText={(text) => setValue("password", text)}
              type={showPassword ? 'text' : 'password'} />
            <InputSlot onPress={handlePasswordShowState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} ></InputIcon>
            </InputSlot>
          </Input>
          {errors.password && (
            <Text className="text-red-500 text-sm text-center">
              {errors.password.message}
            </Text>
          )}
          <Button variant='link' className='justify-start p-4' onPress={() => {
            alert.confirm("Are you sure you want to reset your password?",
              onPasswordReset
            )
          }}>
            <ButtonText size='sm'>Forgot Password?</ButtonText>
          </Button>
        </ModalBody>

        <ModalFooter className="flex-row justify-between mt-4">
          <Button
            variant="outline"
            action="secondary"
            onPress={onBack}
            className="border-gray-400"
          >
            <ButtonText>Back</ButtonText>
          </Button>

          <Button
            action="primary"
            onPress={handleSubmit(onSubmit)}
            isDisabled={isSubmitting}
          >
            <ButtonText>{isSubmitting ? "..." : "Login"}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
