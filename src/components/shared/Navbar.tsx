import React from "react";
import {
  Box,
  Divider,
  Flex,
  useDisclosure,
  IconButton,
  Text,
  Button,
  Link,
} from "@chakra-ui/core";
import {
  MdClose,
  MdExitToApp,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMenu,
  MdSettings,
} from "react-icons/md/index";
import { ReactSVG } from "react-svg";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import ConfirmModal from "./ConfirmModal";

export type MenuItem = {
  label: string;
  icon: IconType;
  to: string;
};

type ItemTileProps = {
  name: string;
  icon: IconType;
  onClick?: () => void;
  active: boolean;
};

type Props = {
  children: JSX.Element | JSX.Element[];
  menuItems: MenuItem[];
  username: string;
  svgSrc: string;
  brandLink: string;
  drawerBackgroundColor?: string;
  navbarMobileBackgroundColor?: string;
  onExitClick?: () => void;
  onConfigClick?: () => void;
};

function Navbar({
  children,
  menuItems,
  username,
  svgSrc,
  onExitClick,
  onConfigClick,
  drawerBackgroundColor,
  navbarMobileBackgroundColor,
  brandLink,
}: Props) {
  const { isOpen: mobileIsOpen, onToggle: mobileOnToggle } = useDisclosure(
    false
  );

  const { isOpen: thinBarIsOpen, onToggle: thinBarOnToggle } = useDisclosure(
    true
  );

  const {
    isOpen: modalExitIsOpen,
    onClose: modalExitOnClose,
    onOpen: modalExitOnOpen,
  } = useDisclosure(false);

  const router = useRouter();

  const ItemTile = (props: ItemTileProps) => (
    <Button
      onClick={props.onClick}
      borderRadius={0}
      isFullWidth
      variant="ghost"
      pl={3}
      pr={3}
      justifyContent="flex-start"
      _focus={{ outline: "none" }}
      leftIcon={() => <Box mr={3} as={props.icon} minWidth={5} size={5} />}
      isActive={props.active}
    >
      <Box transition="250ms" opacity={{ base: 1, md: thinBarIsOpen ? 1 : 0 }}>
        <Text
          fontSize="md"
          fontWeight={300}
          flexGrow={1}
          isTruncated
          textAlign="left"
        >
          {props.name}
        </Text>
      </Box>
    </Button>
  );

  const menuItemsTiles = menuItems.map((menuItem, idx) => {
    const toRoute = () => router.push(menuItem.to);
    return (
      <ItemTile
        key={`${idx}-${menuItem.label}`}
        name={menuItem.label}
        icon={menuItem.icon}
        onClick={toRoute}
        active={menuItem.to === router.pathname}
      />
    );
  });

  return (
    <>
      <Flex height="100%" width="100%" overflow="hidden" position="relative">
        <Flex
          transition="250ms"
          w={{
            base: mobileIsOpen ? "100%" : "0",
            md: thinBarIsOpen ? 240 : 49,
          }}
          minW={{
            base: mobileIsOpen ? "100%" : "0",
            md: thinBarIsOpen ? 240 : 49,
          }}
          position={{ base: "absolute", md: "static" }}
          backgroundColor={drawerBackgroundColor ?? "gray.900"}
          overflow="hidden"
          flexDir="column"
          shadow={{ base: "", md: "7px 0px 19px -9px rgba(0,0,0,0.90)" }}
          height="100%"
          zIndex={20}
        >
          <Link
            href={brandLink}
            _focus={{ outline: "none" }}
            p={2}
            mt={1}
            display={{ base: "none", md: thinBarIsOpen ? "none" : "block" }}
          >
            <ReactSVG style={{ width: "100%" }} src={svgSrc} />
          </Link>
          <Divider
            width="100%"
            display={{ base: "none", md: thinBarIsOpen ? "none" : "block" }}
          />
          <Flex flexGrow={1} width="100%" flexDir="column">
            <Flex
              width="100%"
              p={{ base: 3, md: thinBarIsOpen ? 3 : 2 }}
              display={{ base: "none", md: "flex" }}
              alignItems="center"
            >
              <Link
                href={brandLink}
                _focus={{ outline: "none" }}
                mr={3}
                flexGrow={1}
                display={{ base: "none", md: thinBarIsOpen ? "block" : "none" }}
              >
                <ReactSVG style={{ width: "100%" }} src={svgSrc} />
              </Link>
              <IconButton
                aria-label="Seta para Trás"
                borderRadius="100%"
                size="sm"
                variant="ghost"
                _focus={{ outline: "none" }}
                icon={() => (
                  <Box
                    flexGrow={1}
                    as={
                      thinBarIsOpen ? MdKeyboardArrowLeft : MdKeyboardArrowRight
                    }
                    size={5}
                  />
                )}
                onClick={() => thinBarOnToggle()}
              />
            </Flex>
            <Divider width="100%" display={{ base: "none", md: "block" }} />
            <Flex
              width="100%"
              p={{ base: 3, md: thinBarIsOpen ? 3 : 2 }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box mr={3} display={{ base: "block", md: "none" }}>
                <IconButton
                  aria-label="Fechar Navbar Móvel"
                  borderRadius="100%"
                  size="sm"
                  variant="ghost"
                  onClick={() => mobileOnToggle()}
                  icon={() => <Box flexGrow={1} as={MdClose} size={5} />}
                />
              </Box>
              <Text
                mr={3}
                fontWeight={300}
                fontSize="lg"
                display={{
                  base: "block",
                  md: thinBarIsOpen ? "block" : "none",
                }}
                flexGrow={1}
                isTruncated
              >
                {username}
              </Text>
              <Box>
                <IconButton
                  aria-label="Configurações"
                  borderRadius="100%"
                  size="sm"
                  variant="ghost"
                  onClick={onConfigClick}
                  icon={() => <Box flexGrow={1} as={MdSettings} size={5} />}
                />
              </Box>
            </Flex>
            <Divider width="100%" />
            <Flex flexGrow={1} height={0}>
              <Box w="100%" flexGrow={1} overflowY="auto" overflowX="hidden">
                {menuItemsTiles}
              </Box>
            </Flex>
          </Flex>
          <ItemTile
            name="Sair"
            icon={MdExitToApp}
            onClick={modalExitOnOpen}
            active={false}
          />
        </Flex>
        <Flex flexGrow={1} width="100%">
          <Box
            flexGrow={1}
            width="100%"
            whiteSpace="nowrap"
            overflowY="auto"
            overflowX="auto"
          >
            <Flex
              backgroundColor={navbarMobileBackgroundColor ?? "purple.600"}
              position="sticky"
              width="100%"
              p={3}
              display={{ base: "flex", md: "none" }}
              alignItems="center"
              top={0}
              shadow="0px 7px 19px -9px rgba(0,0,0,0.90)"
              zIndex={10}
            >
              <Box flexGrow={1}>
                <IconButton
                  aria-label="Menu"
                  borderRadius="100%"
                  size="sm"
                  variant="ghost"
                  onClick={() => mobileOnToggle()}
                  icon={() => <Box flexGrow={1} as={MdMenu} size={5} />}
                />
              </Box>
              <Link href={brandLink} _focus={{ outline: "none" }} width={110}>
                <ReactSVG style={{ width: "100%" }} src={svgSrc} />
              </Link>
            </Flex>
            {children}
          </Box>
        </Flex>
      </Flex>
      <ConfirmModal
        title="Deseja Sair do Painel?"
        isOpen={modalExitIsOpen}
        onClose={modalExitOnClose}
        onConfirmAction={onExitClick}
        btnConfirmText="Sair"
      />
    </>
  );
}

export default Navbar;
