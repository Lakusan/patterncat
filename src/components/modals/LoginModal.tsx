import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import BaseModal from "@/src/components/modals/BaseModal";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Divider } from '@/components/ui/divider';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { useTheme } from '@/src/contexts/use-theme-context';
import { loginSchema, LoginSchema } from "@/src/validation/loginSchema";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onPasswordReset: () => void;
  onConfirm: (email: string, password: string) => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onBack,
  onPasswordReset,
  onConfirm
}: LoginModalProps) {

  const [showPassword, setShowPassword] = React.useState(false);
  const { colors } = useTheme();
  
  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleValidSubmit = (data: LoginSchema) => {
    onConfirm(data.email, data.password);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      headerText="Login"
      footer={
        <>
          <Button
            variant="outline"
            action="secondary"
            onPress={onBack}
            className="bg-secondary"
          >
            <ButtonText style={{ color: colors.text_primary }}>Back</ButtonText>
          </Button>

          <Button
            action="primary"
            onPress={handleSubmit(handleValidSubmit)}
            isDisabled={isSubmitting}
          >
            <ButtonText style={{ color: colors.text_primary }}>{isSubmitting ? "..." : "Login"}</ButtonText>
          </Button>
        </>
      }
    >
      <Text  style={{ color: colors.text_primary }} className='text-center m-2'>
        Log In to feel the magic of PATTERN CAT
      </Text>

      <Divider />

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
        <Text className="text-red-500 text-small text-center">
          {errors.email.message}
        </Text>
      )}

      {/* PASSWORD */}
      <Input className="border border-gray-300 rounded-lg m-2">
        <InputField
          placeholder="Passwort"
          onFocus={() => clearErrors()}
          onChangeText={(text) => setValue("password", text)}
          type={showPassword ? 'text' : 'password'}
        />
        <InputSlot onPress={() => setShowPassword(prev => !prev)}>
          <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
        </InputSlot>
      </Input>

      {errors.password && (
        <Text className="text-red-500 text-sm text-center">
          {errors.password.message}
        </Text>
      )}
      {/* PASSWORD VERGESSEN */}
      <Button
        variant='link'
        className=''
        onPress={onPasswordReset}
      >
        <ButtonText style={{ color: colors.text_primary }} size='sm'>Passwort vergessen?</ButtonText>
      </Button>

    </BaseModal>
  );
}
