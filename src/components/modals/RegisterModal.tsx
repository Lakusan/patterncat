import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Text } from '@/components/ui/text';
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CustomAlertDialog from '@/src/components/alterts/CustomAlertDialog';
import { useAuthContext } from "@/src/hooks/use-auth-context";
import { supabase } from "@/src/lib/supabase";
import { registerSchema, RegisterSchema } from "@/src/validation/registerSchema";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSuccess: () => void;
};

export default function RegisterModal({
  isOpen,
  onClose,
  onBack,
  onSuccess,
}: RegisterModalProps) {

  const [eMailAlertModal, setEMailAlertModal] = useState(false);
  const [emailForAlert, setEmailForAlert] = useState("");

  const { signUp } = useAuthContext();

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const resendConfirmation = async (email: string) => {
    try {
      await supabase.auth.resend({
        type: "signup",
        email: email,
      });
      console.log("Confirmation email resent");
    } catch (err) {
      console.log("Resend failed:", err);
    }
  };

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
      });

      // E-Mail speichern → Alert öffnen
      setEmailForAlert(data.email);
      setEMailAlertModal(true);

      // NICHT direkt onSuccess(), erst nach Alert
    } catch (err) {
      console.log("Registration failed:", err);
    }
  };

  const update = (field: keyof RegisterSchema, value: string) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  return (
    <>
      <CustomAlertDialog
        isOpen={eMailAlertModal}
        onClose={() => setEMailAlertModal(false)}
        onBack={() => onClose()}
        email={emailForAlert}
        onResend={resendConfirmation}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />

        <ModalContent className="bg-white rounded-2xl p-4 w-[90%] self-center">
          <ModalHeader>
            <Heading className="text-xl font-bold">Create Account</Heading>
          </ModalHeader>

          <ModalBody className="gap-4">

            {/* EMAIL */}
            <Input className="border border-gray-300 rounded-lg">
              <InputField
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(text) => update("email", text)}
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
                onChangeText={(text) => update("password", text)}
              />
            </Input>
            {errors.password && (
              <Text className="text-red-500 text-sm">{errors.password.message}</Text>
            )}

            {/* CONFIRM PASSWORD */}
            <Input className="border border-gray-300 rounded-lg">
              <InputField
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={(text) => update("confirmPassword", text)}
              />
            </Input>
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm">{errors.confirmPassword.message}</Text>
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
              isDisabled={!isValid || isSubmitting}
            >
              <ButtonText>{isSubmitting ? "..." : "Register"}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
