import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirmAction?: () => void;
  onCancelAction?: () => void;
  btnConfirmText?: string;
  btnCancelText?: string;
};

function ConfirmModal({
  title,
  isOpen,
  onClose,
  btnConfirmText,
  btnCancelText,
  onConfirmAction,
  onCancelAction,
}: Props) {
  const initialRef = React.createRef<HTMLElement>();

  const onConfirm = () => {
    if (onConfirmAction) onConfirmAction();
    onClose();
  };

  const onCancel = () => {
    if (onCancelAction) onCancelAction();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      initialFocusRef={initialRef}
      size="xs"
      isCentered
    >
      <ModalOverlay zIndex={1000} />
      <ModalContent zIndex={1200}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Flex}>
          <Button flexGrow={1} mr={3} onClick={onCancel} pl={6} pr={6}>
            {btnCancelText ?? "Cancelar"}
          </Button>
          <Button
            variantColor="teal"
            variant="outline"
            flexGrow={1}
            ref={initialRef}
            onClick={onConfirm}
            isFullWidth
          >
            {btnConfirmText ?? "Confirmar"}
          </Button>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default ConfirmModal;
