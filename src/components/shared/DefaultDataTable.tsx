import React, { forwardRef } from "react";
import { Box, PseudoBox, useTheme } from "@chakra-ui/core";
import {
  MdAdd,
  MdArrowDownward,
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdClear,
  MdDelete,
  MdEdit,
  MdFilterList,
  MdFirstPage,
  MdLastPage,
  MdRemove,
  MdSave,
  MdSearch,
  MdViewColumn,
} from "react-icons/md";
import MaterialTable, {
  Options,
  MTableToolbar,
  Action,
  Column,
} from "material-table";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const iconList = [
  { iconKey: "Add", icon: MdAdd },
  { iconKey: "Check", icon: MdCheck },
  { iconKey: "Clear", icon: MdClear },
  { iconKey: "Delete", icon: MdDelete },
  { iconKey: "DetailPanel", icon: MdChevronRight },
  { iconKey: "Edit", icon: MdEdit },
  { iconKey: "Export", icon: MdSave },
  { iconKey: "Filter", icon: MdFilterList },
  { iconKey: "FirstPage", icon: MdFirstPage },
  { iconKey: "LastPage", icon: MdLastPage },
  { iconKey: "NextPage", icon: MdChevronRight },
  { iconKey: "PreviousPage", icon: MdChevronLeft },
  { iconKey: "ResetSearch", icon: MdClear },
  { iconKey: "Search", icon: MdSearch },
  { iconKey: "SortArrow", icon: MdArrowDownward },
  { iconKey: "ThirdStateCheck", icon: MdRemove },
  { iconKey: "ViewColumn", icon: MdViewColumn },
];

const defaultTableLocalization = {
  pagination: {
    labelDisplayedRows: "{from}-{to} de {count}",
    labelRowsSelect: "linhas",
  },
  toolbar: {
    nRowsSelected: "{0} linha(s) selecionada(s)",
    searchPlaceholder: "Buscar",
  },
  header: {
    actions: "Ações",
  },
  body: {
    emptyDataSourceMessage: "Vázio",
    filterRow: {
      filterTooltip: "Filtro",
    },
    editRow: {
      deleteText: "Deseja deletar esse item?",
    },
  },
};

const defaultTableOptions: Options<any> = {
  showTitle: false,
  searchFieldAlignment: "left",
  draggable: false,
  paginationType: "stepped",
  pageSize: 10,
  pageSizeOptions: [10, 20, 40, 50],
  actionsColumnIndex: -1,
};

type Props = {
  columns: Column<any>[];
  data: any[];
  actions?: Action<any>[];
  load?: boolean;
  onUpdate?: (data: any) => void;
  onDelete?: (data: any) => void;
};

function DefaultDataTable({
  columns,
  data,
  actions,
  load,
  onUpdate,
  onDelete,
}: Props) {
  const chakraTheme = useTheme();
  const muiTheme = createMuiTheme({
    palette: {
      divider: chakraTheme.colors.gray[700],
      background: {
        default: chakraTheme.colors.gray[700],
        paper: chakraTheme.colors.gray[700],
      },
      primary: {
        main: chakraTheme.colors.gray["300"],
      },
      type: "dark",
    },
  });

  let tableIcons = {};

  iconList.forEach((data) => {
    const Icon = data.icon;

    tableIcons = {
      ...tableIcons,
      [data.iconKey]: forwardRef((props: any, ref: any) => (
        <div ref={ref} {...props}>
          <Icon />
        </div>
      )),
    };
  });

  let editable = {};

  if (onDelete) {
    editable = {
      ...editable,
      onRowDelete: (oldData: any) =>
        new Promise((resolve, reject) => {
          onDelete(oldData);
          resolve();
        }),
    };
  }

  if (onUpdate) {
    actions = [
      ...(actions ?? []),
      {
        icon: MdEdit,
        tooltip: "Editar",
        onClick: (event, rowData) => {
          onUpdate(rowData);
        },
      },
    ];
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Box maxW="100%">
        <MaterialTable
          isLoading={load}
          columns={columns}
          data={data}
          localization={defaultTableLocalization}
          icons={tableIcons}
          options={defaultTableOptions}
          actions={actions}
          editable={editable}
          components={{
            Container: (props) => <Box {...props} w="100%" />,
            Toolbar: (props) => <MTableToolbar {...props} />,
          }}
        />
      </Box>
    </MuiThemeProvider>
  );
}

export default DefaultDataTable;
