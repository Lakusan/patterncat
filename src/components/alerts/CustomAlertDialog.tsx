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
import React from 'react';

import { ComponentProps } from "react";

// Button-Variant direkt aus Gluestack ableiten
export type ButtonVariant = ComponentProps<typeof Button>["variant"];

export interface AlertAction {
  label: string;
  onPress: () => void | Promise<void>;
  variant?: ButtonVariant;
  loading?: boolean;
}

export interface CustomAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  message?: string;

  confirmText?: string;
  onConfirm?: () => void | Promise<void>;

  cancelText?: string;
  onCancel?: () => void;

  actions?: AlertAction[];
}

export default function CustomAlertDialog({
  isOpen,
  onClose,
  title = "Hinweis",
  message,
  confirmText,
  onConfirm,
  cancelText,
  onCancel,
  actions,
}: CustomAlertDialogProps) {
  const finalActions: AlertAction[] =
    actions ??
    [
      cancelText && onCancel
        ? {
            label: cancelText,
            onPress: onCancel,
            variant: "outline",
          }
        : null,
      confirmText
        ? {
            label: confirmText,
            onPress: onConfirm ?? onClose,
            variant: "solid",
          }
        : null,
    ].filter(Boolean) as AlertAction[];
    
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
      <AlertDialogBackdrop />

      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="md">{title}</Heading>
        </AlertDialogHeader>

        <AlertDialogBody className="mt-3 mb-4">
          {message && <Text size="sm">{message}</Text>}
        </AlertDialogBody>

        <AlertDialogFooter className="flex-row gap-2">
          {finalActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onPress={action.onPress}
              isDisabled={action.loading}
            >
              <ButtonText>
                {action.loading ? "..." : action.label}
              </ButtonText>
            </Button>
          ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
