import React from "react";
import {
  DrawerFooter,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Drawer,
  Flex,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/core";
import { MdKeyboardArrowRight } from "react-icons/md";
import LazyLoad from "./LazyLoad";
import {Container} from "next/app";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: JSX.Element | JSX.Element[] | string | string[];
  onConfirmAction?: () => void;
  onCancelAction?: () => void;
  btnConfirmText?: string;
  btnCancelText?: string;
  load?: boolean;
};

function FormDrawer({
  title,
  isOpen,
  onClose,
  btnConfirmText,
  btnCancelText,
  onConfirmAction,
  onCancelAction,
  load,
  children,
}: Props) {
  const initialRef = React.createRef<HTMLElement>();

  const onConfirm = () => {
    if (onConfirmAction) onConfirmAction();
  };

  const onCancel = () => {
    if (onCancelAction) onCancelAction();
    onClose();
  };

  let content = (
    <Box w="100%" flexGrow={1} overflowY="auto" overflowX="hidden">
      {children}
    </Box>
  );

  if (load) {
    content = <LazyLoad />;
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={load ? () => null : onCancel}
      closeOnEsc={!load}
      initialFocusRef={initialRef}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay zIndex={1000} />
      <DrawerContent zIndex={1200} >
        <DrawerHeader>
          <Flex alignItems="center">
            <IconButton
              aria-label="Fechar Formulário"
              borderRadius="100%"
              size="sm"
              mr={3}
              variant="ghost"
              _focus={{ outline: "none" }}
              icon={() => <Box as={MdKeyboardArrowRight} size={5} />}
              onClick={load ? () => null : onCancel}
            />
            <Box flexGrow={1} width={0}>
              <Text fontSize="xl" isTruncated>
                {title}
              </Text>
            </Box>
          </Flex>
        </DrawerHeader>
        <DrawerBody as={Flex} height={0}>
          {content}
        </DrawerBody>
        <DrawerFooter height={{ base: 130, lg: 70 }}>
          <Button
            mr={3}
            pl={6}
            pr={6}
            onClick={load ? () => null : onCancel}
            ref={initialRef}
            isDisabled={load}
          >
            {btnCancelText ?? "Cancelar"}
          </Button>
          <Button
            variantColor="teal"
            variant="outline"
            isFullWidth
            onClick={onConfirm}
            isDisabled={load}
          >
            {btnConfirmText ?? "Confirmar"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default FormDrawer;
