import React from "react";
import SimpleEvent from "../../../models/simple-event";
import LazyLoad from "../../shared/LazyLoad";
import SimpleEventTopTile from "./SimpleEventTopTile";
import { Box, Stack } from "@chakra-ui/core";
import SimpleVacancy from "../../../models/simple-vacancy";
import ClientTile from "./ClientTile";

type Props = {
  load: boolean;
  simpleEvents: SimpleEvent[];
  onCreateReport: (simpleEvent: SimpleEvent) => void;
};

function HomeEvents({ simpleEvents, load, onCreateReport }: Props) {
  if (load) return <LazyLoad />;

  const eventTiles = simpleEvents.map((simpleEvent: SimpleEvent) => (
    <Box width="100%" key={simpleEvent.id}>
      <SimpleEventTopTile
        simpleEvent={simpleEvent}
        onCreateReport={() => onCreateReport(simpleEvent)}
      />
      {simpleEvent.simpleVacancy.map((simpleVacancy: SimpleVacancy) => (
        <ClientTile key={simpleVacancy.id} simpleVacancy={simpleVacancy} />
      ))}
    </Box>
  ));

  return (
    <Stack spacing={4} width="100%">
      {eventTiles}
    </Stack>
  );
}

export default HomeEvents;
