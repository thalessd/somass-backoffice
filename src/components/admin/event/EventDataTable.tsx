import React from "react";
import Event from "../../../models/event";
import DefaultDataTable from "../../shared/DefaultDataTable";
import { Action, Column } from "material-table";
import ManageDate from "../../../helpers/manage-date";
import TableFieldCheckbox from "../../shared/TableFieldCheckbox";
import { MdPictureAsPdf } from "react-icons/md";

type Props = {
  data: Event[];
  load: boolean;
  onCreateReport: (data: Event) => void;
  onDelete?: (data: Event) => void;
  onUpdate?: (data: Event) => void;
};

function EventDataTable({
  load,
  data,
  onCreateReport,
  onUpdate,
  onDelete,
}: Props) {
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

  const actions: Action<any>[] = [
    {
      icon: MdPictureAsPdf,
      tooltip: "Gerar Relatório",
      onClick: (_, rowData: Event) => onCreateReport(rowData),
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
      actions={actions}
      load={load}
      data={data}
      columns={columns}
    />
  );
}

export default EventDataTable;
