import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@/components/ui/modal";
import { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  header,
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
          ${className ?? ""}
        `}
      >
        {header && (
          <ModalHeader>
            {header}
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
