import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

type EMailResentAltertDialogType = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  email: string;
  onResend: (email: string) => Promise<void>;
};

export default function EMailResentAltertDialog({
  isOpen,
  onClose,
  onBack,
  email,
  onResend,
}: EMailResentAltertDialogType) {

  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    if (isResending) return;

    try {
      setIsResending(true);
      await onResend(email);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
      <AlertDialogBackdrop />

      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            E-Mail-Adresse bestätigen!
          </Heading>
        </AlertDialogHeader>

        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm">
            Wir haben dir eine Bestätigungsmail an{" "}
            <Text className="font-bold">{email}</Text> gesendet.
          </Text>

          <Text size="sm" className="mt-3 flex-row items-center">
            Keine Mail erhalten?{" "}

            {isResending ? (
              <ActivityIndicator size="small" color="#2563eb" style={{ marginLeft: 6 }} />
            ) : (

              <Pressable onPress={handleResend}>
                <Text className="text-blue-600 underline">
                  Erneut senden
                </Text>
              </Pressable>

            )}
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button size="sm" onPress={onClose}>
            <ButtonText>OK</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
