import React from "react";
import SimpleVacancy from "../../../models/simple-vacancy";
import { Box, Divider, Flex, Text } from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import ManageDate from "../../../helpers/manage-date";

type Props = {
  simpleVacancy: SimpleVacancy;
};

function ClientTile({ simpleVacancy }: Props) {
  return (
    <Box p={2}>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Text fontSize="lg" fontWeight={300}>
          {simpleVacancy.simpleClient.nameOfMain}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {formatDistanceToNow(
            ManageDate.globalToLocal(
              new Date(simpleVacancy.createdAt ?? new Date())
            ),
            {
              locale: ptBR,
            }
          )}
        </Text>
      </Flex>
      <Divider mt={1} mb={1} />
      <Box ml={5}>
        {simpleVacancy.simpleClient.escortNames.map((name: string) => {
          return (
            <>
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="lg" fontWeight={300}>
                  {name}
                </Text>
                <Text fontSize="sm" fontWeight={300} color="gray.400">
                  Acompanhante
                </Text>
              </Flex>
              <Divider mt={1} mb={1} />
            </>
          );
        })}
      </Box>
    </Box>
  );
}

export default ClientTile;
