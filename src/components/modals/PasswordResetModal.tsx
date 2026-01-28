import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import BaseModal from "@/src/components/modals/BaseModal";
import { emailSchema, EmailSchema } from "@/src/validation/emailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type PasswordResetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (email: string) => void;
};

export default function PasswordResetModal({
  isOpen,
  onClose,
  onBack,
  onConfirm,
}: PasswordResetModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" action="secondary" onPress={onBack}>
            <ButtonText>Back</ButtonText>
          </Button>

          <Button
            action="primary"
            disabled={!isValid}
            onPress={handleSubmit(({ email }) => onConfirm(email))}
          >
            <ButtonText>OK</ButtonText>
          </Button>
        </>
      }
    >
      <Text>Password Reset</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input className="border border-gray-300 rounded-lg mt-4">
            <InputField
              placeholder="Email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          </Input>
        )}
      />

      {errors.email && (
        <Text className="text-red-500 text-sm mt-1">
          {errors.email.message}
        </Text>
      )}
    </BaseModal>
  );
}
