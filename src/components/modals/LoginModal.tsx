import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from '@/components/ui/text';
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthContext } from "@/src/hooks/use-auth-context";
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

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
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

    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent className="bg-white rounded-2xl p-4 w-[90%] self-center">
        <ModalHeader>
          <Heading className="text-xl font-bold">Login</Heading>
        </ModalHeader>

        <ModalBody className="gap-4">
          {/* EMAIL */}
          <Input className="border border-gray-300 rounded-lg">
            <InputField
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(text) => setValue("email", text)}
            />
          </Input>
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}

          {/* PASSWORD */}
          <Input className="border border-gray-300 rounded-lg">
            <InputField
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setValue("password", text)}
            />
          </Input>
          {errors.password && (
            <Text className="text-red-500 text-sm">
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
