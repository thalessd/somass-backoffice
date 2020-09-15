import React from "react";
import AdminContentScreen from "./AdminContentScreen";
import EventApi from "../services/event.api";
import { ApiAlert } from "../helpers/api-alert";
import SimpleEvent from "../models/simple-event";
import { useToast } from "@chakra-ui/core";
import HomeEvents from "../components/admin/home/HomeEvents";
import ShowToast from "../helpers/show-toast";

async function loadList(
  toast: any,
  setSimpleEvents: (list: SimpleEvent[]) => void,
  toggleLoad: (load: boolean) => void
) {
  toggleLoad(true);

  try {
    const list = await EventApi.findAllSimpleEvents();

    setSimpleEvents(list);
  } catch (e) {
    ApiAlert.errorFindAll(e, toast, "Evento");
  } finally {
    toggleLoad(false);
  }
}

async function downloadReport(
  item: SimpleEvent,
  toast: any,
  toggleLoad: (load: boolean) => void
) {
  toggleLoad(true);

  try {
    await EventApi.downloadReport(item);
  } catch (e) {
    new ShowToast(toast).error("Não foi possível gerar o relatório");
  } finally {
    toggleLoad(false);
  }
}

function AdminHomeScreen() {
  const [load, toggleLoad] = React.useState<boolean>(true);
  const [simpleEvents, setSimpleEvents] = React.useState<SimpleEvent[]>([]);

  const toast = useToast();

  React.useEffect(() => {
    loadList(toast, setSimpleEvents, toggleLoad).then();
  }, []);

  const onRequestReport = (simpleEvent: SimpleEvent) =>
    downloadReport(simpleEvent, toast, toggleLoad);

  return (
    <AdminContentScreen title="Eventos da Semana" hideBackArrow>
      <HomeEvents
        simpleEvents={simpleEvents}
        load={load}
        onCreateReport={onRequestReport}
      />
    </AdminContentScreen>
  );
}

export default AdminHomeScreen;
