import React from "react";
import Event from "../../../models/event";
import DefaultDataTable from "../../shared/DefaultDataTable";
import { Column } from "material-table";
import BrlCurrency from "../../../helpers/brl-currency";
import ManageDate from "../../../helpers/manage-date";
import TableFieldCheckbox from "../../shared/TableFieldCheckbox";

type Props = {
  data: Event[];
  load: boolean;
  onDelete?: (data: Event) => void;
  onUpdate?: (data: Event) => void;
};

function EventDataTable({ load, data, onUpdate, onDelete }: Props) {
  const columns: Column<any>[] = [
    { title: "Localização", field: "location" },
    { title: "Hora de Inicio", field: "startTime" },
    {
      title: "Dia da Semana",
      field: "dayOfWeek",
      render: (rowData: Event) => (
        <>{ManageDate.dayOfWeekToString(rowData.dayOfWeek)}</>
      ),
    },
    { title: "Vagas", field: "vacancy" },
    {
      title: "Disponível?",
      field: "available",
      render: (rowData: Event) => (
        <TableFieldCheckbox checked={rowData.available} />
      ),
    },
    {
      title: "Criado Por",
      field: "createdBy.name",
    },
  ];

  return (
    <DefaultDataTable
      onUpdate={(data: any) =>
        onUpdate ? onUpdate(data as Event) : () => null
      }
      onDelete={(data: any) =>
        onDelete ? onDelete(data as Event) : () => null
      }
      load={load}
      data={data}
      columns={columns}
    />
  );
}

export default EventDataTable;
