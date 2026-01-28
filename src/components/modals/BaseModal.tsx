import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter
} from "@/components/ui/modal";
import { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  footer,
  className
}: BaseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent className={`max-w-[375px] ${className ?? ""}`}>
        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter className="flex-row justify-between mt-4">{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}
