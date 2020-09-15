import { Box, Button, Text } from "@chakra-ui/core";
import Link from "next/link";

type Props = {};

export function NotFoundScreen(props: Props) {
  return (
    <Box
      flex="1 1 auto"
      d="flex"
      overflow="hidden"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={["0 10px", "0 70px"]}
    >
      <Text fontSize="3xl" mb={6} fontWeight="bold">
        Página Não Encontrada
      </Text>
      <Link href="/">
        <Button rightIcon="arrow-forward">Página Inicial</Button>
      </Link>
    </Box>
  );
}
