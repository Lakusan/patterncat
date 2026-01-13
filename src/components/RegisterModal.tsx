import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from '@/components/ui/text';
import React from "react";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent className="bg-white rounded-2xl p-4 w-[90%] self-center">
        <ModalHeader>
          <Heading className="text-xl font-bold">Create Account</Heading>
        </ModalHeader>

        <ModalBody className="gap-4">
          <Text className="text-gray-600">
            Fill in your details to create a new account.
          </Text>

          <Input className="border border-gray-300 rounded-lg">
            <InputField placeholder="Full Name" />
          </Input>

          <Input className="border border-gray-300 rounded-lg">
            <InputField placeholder="Email" keyboardType="email-address" />
          </Input>

          <Input className="border border-gray-300 rounded-lg">
            <InputField placeholder="Password" secureTextEntry />
          </Input>
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

          <Button action="primary" onPress={onClose}>
            <ButtonText>Register</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
