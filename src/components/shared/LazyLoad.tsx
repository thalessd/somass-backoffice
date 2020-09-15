import React from "react";
import { Flex, Spinner } from "@chakra-ui/core";

function LazyLoad() {
  return (
    <Flex flexGrow={1} alignItems="center" justifyContent="center">
      <Spinner size="xl" thickness="4px" />
    </Flex>
  );
}

export default LazyLoad;
