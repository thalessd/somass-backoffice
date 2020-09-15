import React from "react";
import User from "../../../models/user";
import DefaultDataTable from "../../shared/DefaultDataTable";
import { Column } from "material-table";

type Props = {
  data: User[];
  load: boolean;
  onDelete?: (data: User) => void;
  onUpdate?: (data: User) => void;
};

function UserDataTable({ load, data, onUpdate, onDelete }: Props) {
  const columns: Column<any>[] = [
    { title: "Nome", field: "name" },
    { title: "Email", field: "email" },
    { title: "Regras", field: "roles" },
  ];

  return (
    <DefaultDataTable
      onUpdate={(data: any) => (onUpdate ? onUpdate(data as User) : () => null)}
      onDelete={(data: any) => (onDelete ? onDelete(data as User) : () => null)}
      load={load}
      data={data}
      columns={columns}
    />
  );
}

export default UserDataTable;
