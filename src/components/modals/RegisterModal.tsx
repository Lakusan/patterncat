import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
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
import { Pressable, ScrollView, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Checkbox, CheckboxIcon, CheckboxIndicator } from "@/components/ui/checkbox";
import { CheckIcon } from '@/components/ui/icon';
import CustomAlertDialog from "@/src/components/alterts/CustomAlertDialog";
import { useAuthContext } from "@/src/hooks/use-auth-context";
import { supabase } from "@/src/lib/supabase";
import { registerSchema, RegisterSchema } from "@/src/validation/registerSchema";
import AGB from "../regulations/AGB";

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

  useEffect(() => {
    if (!isOpen) {
      // Reset aller lokalen States
      setShowAGB(false);
      setShowDSGVO(false);
      setHasReadAGB(false);
      setHasReadDSGVO(false);
      setEMailAlertModal(false);
      setEmailForAlert("");

      // Reset des Formulars
      setValue("email", "");
      setValue("password", "");
      setValue("confirmPassword", "");
      setValue("agreed", false);
    }
  }, [isOpen]);

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

  const update = (field: keyof RegisterSchema, value: any) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

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

  /* -------------------------------------------------------
     PASSWORT CHECKLISTE UI-only
  ------------------------------------------------------- */
  const pwChecks = [
    { label: "Mindestens 8 Zeichen", valid: password.length >= 8 },
    { label: "Kleinbuchstaben enthalten", valid: /[a-z]/.test(password) },
    { label: "Großbuchstaben enthalten", valid: /[A-Z]/.test(password) },
    { label: "Mindestens eine Zahl", valid: /[0-9]/.test(password) },
    { label: "Sonderzeichen enthalten", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <>
      {/* -------------------------------------------------------
          E-MAIL BESTÄTIGUNGSMODAL
      ------------------------------------------------------- */}
      <CustomAlertDialog
        isOpen={eMailAlertModal}
        onClose={() => setEMailAlertModal(false)}
        onBack={onClose}
        email={emailForAlert}
        onResend={resendConfirmation}
      />

      {/* -------------------------------------------------------
          AGB MODAL
      ------------------------------------------------------- */}
      <Modal isOpen={showAGB} onClose={() => setShowAGB(false)}>
        <ModalBackdrop />
        <ModalContent className="bg-white rounded-2xl p-4 w-[90%] self-center">

          <ModalHeader>
            <Heading className="text-xl font-bold">AGB</Heading>
          </ModalHeader>

          <ModalBody>
            <View className="max-h-[400px]">
              <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                onScroll={(e) => {
                  const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
                  const isBottom =
                    layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;

                  if (isBottom) {
                    setHasReadAGB(true);
                    console.log("AGB komplett gelesen");
                  }
                }}
                scrollEventThrottle={16}
              >
                <AGB />
              </ScrollView>
            </View>

            {/* Feedback unter dem Scrollbereich */}
            <View className="h-6 mt-2">
              {hasReadAGB && (
                <Text className="text-green-600 text-center font-medium">
                  ✓ AGB vollständig gelesen
                </Text>
              )}
            </View>
          </ModalBody>

          <ModalFooter className="flex-col gap-3">

            {/* Weiter-Button mit Aktivierungs-Animation */}
            <Button
              isDisabled={!hasReadAGB}
              className={`
          w-full py-3 rounded-xl
          transition-all duration-300
          ${hasReadAGB ? "bg-blue-600 opacity-100" : "bg-gray-300 opacity-60"}
        `}
              onPress={() => {
                setShowAGB(false);
              }}
            >
              <ButtonText className="text-white font-semibold">
                Weiter
              </ButtonText>
            </Button>

            {/* Schließen-Button */}
            <Button
              variant="outline"
              onPress={() => setShowAGB(false)}
              className="w-full border-gray-300"
            >
              <ButtonText className="text-gray-700">Schließen</ButtonText>
            </Button>

          </ModalFooter>

        </ModalContent>
      </Modal>


      {/* -------------------------------------------------------
          DSGVO MODAL
      ------------------------------------------------------- */}
      <Modal isOpen={showDSGVO} onClose={() => setShowDSGVO(false)}>
        <ModalBackdrop />
        <ModalContent className="bg-white rounded-2xl p-4 w-[90%] self-center">

          <ModalHeader>
            <Heading className="text-xl font-bold">DSGVO</Heading>
          </ModalHeader>

          <ModalBody>
            <View className="max-h-[400px]">
              <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                onScroll={(e) => {
                  const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
                  const isBottom =
                    layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;

                  if (isBottom) {
                    setHasReadDSGVO(true);
                  }
                }}
                scrollEventThrottle={16}
              >
                <AGB />
              </ScrollView>
            </View>

            {/* Feedback unter dem Scrollbereich */}
            <View className="h-6 mt-2">
              {hasReadDSGVO && (
                <Text className="text-green-600 text-center font-medium">
                  ✓ DSGVO vollständig gelesen
                </Text>
              )}
            </View>
          </ModalBody>

          <ModalFooter className="flex-col gap-3">

            {/* Weiter-Button mit Aktivierungs-Animation */}
            <Button
              isDisabled={!hasReadDSGVO}
              className={`
          w-full py-3 rounded-xl
          transition-all duration-300
          ${hasReadDSGVO ? "bg-blue-600 opacity-100" : "bg-gray-300 opacity-60"}
        `}
              onPress={() => {
                setShowDSGVO(false);
              }}
            >
              <ButtonText className="text-white font-semibold">
                Weiter
              </ButtonText>
            </Button>

            {/* Schließen-Button */}
            <Button
              variant="outline"
              onPress={() => setShowDSGVO(false)}
              className="w-full border-gray-300"
            >
              <ButtonText className="text-gray-700">Schließen</ButtonText>
            </Button>

          </ModalFooter>

        </ModalContent>
      </Modal>

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
                secureTextEntry
                onChangeText={(text) => update("password", text)}
              />
            </Input>

            {/* Passwort Checkliste */}
            <View style={{ marginTop: 8 }}>
              {pwChecks.map((c, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text className={c.valid ? "text-green-600" : "text-red-500"}>
                    {c.valid ? "✓" : "✗"}
                  </Text>
                  <Text
                    className={c.valid ? "text-green-600 ml-2" : "text-red-500 ml-2"}
                  >
                    {c.label}
                  </Text>
                </View>
              ))}
            </View>

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
