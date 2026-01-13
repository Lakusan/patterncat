import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from '@/components/ui/text';
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthContext } from "@/src/hooks/use-auth-context";
import { registerSchema, RegisterSchema } from "@/src/validation/registerSchema";
import { router } from 'expo-router';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
};

export default function RegisterModal({
  isOpen,
  onClose,
  onBack,
}: RegisterModalProps) {

  const { signUp } = useAuthContext(); 

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
      });
      onClose();
      router.replace("/(main)/home");
    } catch (err) {
      console.log("Registration failed:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent className="bg-white rounded-2xl p-4 w-[90%] self-center">
        <ModalHeader>
          <Heading className="text-xl font-bold">Create Account</Heading>
        </ModalHeader>

        <ModalBody className="gap-4">
          {/* USERNAME */}
          <Input className="border border-gray-300 rounded-lg">
            <InputField
              placeholder="Username"
              onChangeText={(text) => setValue("username", text)}
            />
          </Input>
          {errors.username && (
            <Text className="text-red-500 text-sm">{errors.username.message}</Text>
          )}

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
            <ButtonText>{isSubmitting ? "..." : "Register"}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
