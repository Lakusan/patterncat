import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerText?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  headerText,
  children,
  footer,
  className
}: BaseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent
        className={`
          flex
          min-h-[50%]
          lg:max-w-[375px]
          bg-background
          ${className ?? ""}
        `}
      >
        {headerText && (
            <ModalHeader>
            <Text className="text-text_primary">
            {headerText}
            </Text>
            <ModalCloseButton />
          </ModalHeader>
        )}

        <ModalBody
        >
          {children}
        </ModalBody>

        {footer && (
          <ModalFooter className="flex-row justify-between">
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
