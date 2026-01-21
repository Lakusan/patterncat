import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Checkbox, CheckboxIcon, CheckboxIndicator } from "@/components/ui/checkbox";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";

import EMailResentAltertDialog from "@/src/components/alerts/EMailResentAltertDialog";
import { LegalModal } from "@/src/components/modals/LegalModal";
import AGB from "@/src/components/regulations/AGB";
import DSGVO from "@/src/components/regulations/DSGVO";

import { useAuthContext } from "@/src/contexts/use-auth-context";
import { supabase } from "@/src/lib/supabase";

import { PASSWORD_LIMITS } from "@/src/constants/validation/limits";
import { checkPasswordRules } from "@/src/validation/CheckPasswords";
import { registerSchema, RegisterSchema } from "@/src/validation/registerSchema";

/* -------------------------------------------------------
   PROPS
------------------------------------------------------- */
type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSuccess: () => void;
};

/* -------------------------------------------------------
   REGISTER MODAL
------------------------------------------------------- */
export default function RegisterModal({
  isOpen,
  onClose,
  onBack,
  onSuccess,
}: RegisterModalProps) {
  const [eMailAlertModal, setEMailAlertModal] = useState(false);
  const [emailForAlert, setEmailForAlert] = useState("");

  const [showAGB, setShowAGB] = useState(false);
  const [showDSGVO, setShowDSGVO] = useState(false);

  const [hasReadAGB, setHasReadAGB] = useState(false);
  const [hasReadDSGVO, setHasReadDSGVO] = useState(false);

  const { signUp } = useAuthContext();

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const password = watch("password") ?? "";
  const agreed = watch("agreed") ?? false;

  const rules = checkPasswordRules(password);

  const update = (field: keyof RegisterSchema, value: any) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  useEffect(() => {
    if (!isOpen) {
      setShowAGB(false);
      setShowDSGVO(false);
      setHasReadAGB(false);
      setHasReadDSGVO(false);
      setEMailAlertModal(false);
      setEmailForAlert("");

      setValue("email", "");
      setValue("password", "");
      setValue("confirmPassword", "");
      setValue("agreed", false);
    }
  }, [isOpen]);

  const resendConfirmation = async (email: string) => {
    try {
      await supabase.auth.resend({
        type: "signup",
        email,
      });
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

      setEmailForAlert(data.email);
      setEMailAlertModal(true);
    } catch (err) {
      console.log("Registration failed:", err);
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordShowState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const handlePasswordConfirmShowState = () => {
    setShowPasswordConfirm((showState) => {
      return !showState;
    });
  };

  return (
    <>
      {/* -------------------------------------------------------
          E-MAIL BESTÄTIGUNGSMODAL
      ------------------------------------------------------- */}
      <EMailResentAltertDialog
        isOpen={eMailAlertModal}
        onClose={() => setEMailAlertModal(false)}
        onBack={onClose}
        email={emailForAlert}
        onResend={resendConfirmation}
      />

      {/* -------------------------------------------------------
          AGB MODAL
      ------------------------------------------------------- */}
      <LegalModal
        visible={showAGB}
        title="AGB"
        hasRead={hasReadAGB}
        onClose={() => setShowAGB(false)}
        onReadComplete={() => setHasReadAGB(true)}
      >
        <AGB />
      </LegalModal>

      {/* -------------------------------------------------------
          DSGVO MODAL
      ------------------------------------------------------- */}
      <LegalModal
        visible={showDSGVO}
        title="Datenschutz"
        hasRead={hasReadDSGVO}
        onClose={() => setShowDSGVO(false)}
        onReadComplete={() => setHasReadDSGVO(true)}
      >
        <DSGVO />
      </LegalModal>

      {/* -------------------------------------------------------
          REGISTER MODAL
      ------------------------------------------------------- */}
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
                onChangeText={(text) => update("password", text)}
                type={showPassword ? 'text' : 'password'}
              />
              <InputSlot onPress={handlePasswordShowState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} ></InputIcon>
              </InputSlot>
            </Input>

            {/* Passwort Checkliste (NEU, korrekt, synchron mit Zod) */}
            <View className="mt-2">
              <Text className={rules.length ? "text-green-600" : "text-red-500"}>
                {rules.length ? "✓" : "✗"} Mindestens {PASSWORD_LIMITS.MIN_LENGTH} Zeichen
              </Text>

              <Text className={rules.lower ? "text-green-600" : "text-red-500"}>
                {rules.lower ? "✓" : "✗"} Kleinbuchstaben enthalten
              </Text>

              <Text className={rules.upper ? "text-green-600" : "text-red-500"}>
                {rules.upper ? "✓" : "✗"} Großbuchstaben enthalten
              </Text>

              <Text className={rules.number ? "text-green-600" : "text-red-500"}>
                {rules.number ? "✓" : "✗"} Mindestens eine Zahl
              </Text>

              <Text className={rules.special ? "text-green-600" : "text-red-500"}>
                {rules.special ? "✓" : "✗"} Sonderzeichen enthalten
              </Text>
            </View>

            {errors.password && (
              <Text className="text-red-500 text-sm">{errors.password.message}</Text>
            )}

            {/* CONFIRM PASSWORD */}
            <Input className="border border-gray-300 rounded-lg">
              <InputField
                placeholder="Confirm Password"
                type={showPasswordConfirm ? 'text' : 'password'}
              />
              <InputSlot onPress={handlePasswordConfirmShowState}>
                <InputIcon as={showPasswordConfirm ? EyeIcon : EyeOffIcon} ></InputIcon>
              </InputSlot>
            </Input>
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </Text>
            )}

            {/* -------------------------------------------------------
                AGB + DSGVO CHECKBOX
            ------------------------------------------------------- */}
            <View className="flex-row items-start mt-4">

              <Checkbox
                isChecked={agreed}
                isDisabled={!hasReadAGB || !hasReadDSGVO}
                onChange={(val) => update("agreed", val)}
                value="agreed"
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </Checkbox>

              <View className="flex-row flex-wrap">
                <Text>Ich habe die </Text>

                <Pressable onPress={() => setShowAGB(true)}>
                  <Text className="text-blue-600 underline">AGB</Text>
                </Pressable>

                <Text> und die </Text>

                <Pressable onPress={() => setShowDSGVO(true)}>
                  <Text className="text-blue-600 underline">Datenschutzbestimmungen</Text>
                </Pressable>

                <Text> gelesen und akzeptiere sie.</Text>
              </View>

            </View>

            {errors.agreed && (
              <Text className="text-red-500 text-sm">{errors.agreed.message}</Text>
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
