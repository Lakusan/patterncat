import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from '@/components/ui/text';
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Divider } from '@/components/ui/divider';
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { useAlert } from '@/src/hooks/useAlert';
import { loginSchema, LoginSchema } from "@/src/validation/loginSchema";
import { router } from 'expo-router';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onBack,
}: LoginModalProps) {

  const { signIn } = useAuthContext();
  const alert = useAlert();
  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
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
              secureTextEntry
              onFocus={clearErrors()}
              onChangeText={(text) => setValue("password", text)}
            />
          </Input>
          {errors.password && (
            <Text className="text-red-500 text-sm text-center">
              {errors.password.message}
            </Text>
          )}
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
