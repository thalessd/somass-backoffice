import React from "react";
import SimpleEvent from "../../../models/simple-event";
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/core";
import {MdEvent, MdEventBusy, MdPeople, MdPictureAsPdf} from "react-icons/md";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  simpleEvent: SimpleEvent;
  onCreateReport: () => void;
};

function SimpleEventTopTile({ simpleEvent, onCreateReport }: Props) {
  return (
    <Flex p={3} backgroundColor="gray.700" borderRadius={5} alignItems="center">
      <Box p={3} backgroundColor="gray.900" mr={3} borderRadius="100%">
        <MdEvent size={25} />
      </Box>
      <Box flexGrow={1} flexDirection="column">
        <Heading fontSize="lg">{simpleEvent.location}</Heading>
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Flex alignItems="center" mr={3}>
            <MdPeople size={15} />
            <Text ml={2} mb="2px">
              {`${simpleEvent.occupiedVacancies} de ${simpleEvent.totalVacancies}`}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <MdEventBusy size={15} />
            <Text ml={2} mb="2px">
              {format(new Date(simpleEvent.date), "dd/MM HH:mm | EEEE", {
                locale: ptBR,
              }).toUpperCase()}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <IconButton
        icon={MdPictureAsPdf}
        borderRadius="100%"
        aria-label="Download do Relatório"
        onClick={onCreateReport}
      />
    </Flex>
  );
}

export default SimpleEventTopTile;
