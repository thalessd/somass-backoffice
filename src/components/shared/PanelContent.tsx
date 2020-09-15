import React from "react";
import { Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/core";
import { MdArrowBack } from "react-icons/md/index";
import { IconType } from "react-icons";

export type PanelAction = {
  label: string;
  icon: IconType;
  onClick: () => void;
};

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
  actions?: PanelAction[];
  backgroundColor?: string;
  onBackClick?: () => void;
  hideBackArrow?: boolean;
};

function PanelContent({
  title,
  children,
  actions,
  backgroundColor,
  onBackClick,
  hideBackArrow,
}: Props) {
  const actionTiles = (actions ?? []).map((action, idx) => {
    const marginLeft =
      idx === (actions?.length ?? 0) - 1 ? { base: 1, md: 3 } : 0;

    return (
      <React.Fragment key={`${action.label}-${idx}`}>
        <Box display={{ base: "block", md: "none" }} ml={marginLeft}>
          <IconButton
            aria-label={action.label}
            borderRadius="100%"
            variant="ghost"
            height="auto"
            p={1}
            width="auto"
            minW="auto"
            _focus={{ outline: "none" }}
            icon={() => <Box as={action.icon} size="30px" />}
            onClick={action.onClick}
          />
        </Box>
        <Button
          onClick={action.onClick}
          size="md"
          display={{ base: "none", md: "flex" }}
          ml={marginLeft}
          leftIcon={action.icon}
        >
          {action.label}
        </Button>
      </React.Fragment>
    );
  });

  return (
    <Box p={{ base: 2, md: 5 }}>
      <Flex
        alignItems="center"
        mb={{ base: 0, md: 3 }}
        position={{ base: "static", md: "sticky" }}
        top={0}
        backgroundColor={backgroundColor ?? "gray.800"}
        pt={2}
        pb={2}
        zIndex={20}
      >
        <IconButton
          aria-label="Seta para Trás"
          borderRadius="100%"
          variant="ghost"
          height="auto"
          p={1}
          width="auto"
          minW="auto"
          _focus={{ outline: "none" }}
          icon={() => (
            <Box as={MdArrowBack} size={{ base: "30px", md: "32px" }} />
          )}
          onClick={onBackClick}
          hidden={hideBackArrow ?? false}
        />
        <Heading
          as="h1"
          pb="2px"
          flexGrow={1}
          fontWeight={{ base: "normal", md: "bold" }}
          ml={hideBackArrow ? 0 : { base: 2, md: 3 }}
          fontSize="3xl"
        >
          {title}
        </Heading>
        {actionTiles}
      </Flex>
      {children}
    </Box>
  );
}

export default PanelContent;
