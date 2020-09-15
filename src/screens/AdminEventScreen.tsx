import React from "react";
import AdminContentScreen from "./AdminContentScreen";
import { useToast } from "@chakra-ui/core";
import Event from "../models/event";
import EventApi from "../services/event.api";
import EventDataTable from "../components/admin/event/EventDataTable";
import { ApiAlert } from "../helpers/api-alert";
import { ManageList } from "../helpers/manage-list";
import { DayOfWeek } from "../models/day-of-week.enum";
import FormDrawer from "../components/shared/FormDrawer";
import EventForm from "../components/admin/event/EventForm";
import ShowToast from "../helpers/show-toast";

const pageName = {
  singular: "Evento",
  plural: "Eventos",
};

enum Types {
  TOGGLE_LOAD = "event/TOGGLE_LOAD",
  TOGGLE_FORM_DRAWER = "event/TOGGLE_FORM_DRAWER",
  SET_CURRENT = "event/SET_CURRENT",
  CLEAR_CURRENT = "event/CLEAR_CURRENT",
  SET_FORM_TITLES = "event/SET_FORM_TITLES",
  SET_LIST_DATA = "event/SET_LIST_DATA",
  ADD_ITEM_TO_LIST = "event/ADD_ITEM_TO_LIST",
  REMOVE_ITEM_FROM_LIST = "event/REMOVE_ITEM_FROM_LIST",
  UPDATE_ITEM_FROM_LIST = "event/UPDATE_ITEM_FROM_LIST",
}

const emptyCurrent = new Event("", "16:30:00", DayOfWeek.Sunday, 1, true);

const initialState = {
  current: emptyCurrent,
  formDrawerOpen: false,
  list: [],
  load: false,
  titles: {
    form: "",
    buttonSubmit: "",
  },
};

const reducer = (
  state: typeof initialState,
  action: { type: Types; payload?: any }
) => {
  const { type, payload } = action;

  let list: Event[];

  switch (type) {
    case Types.TOGGLE_LOAD:
      return { ...state, load: payload.load };
    case Types.TOGGLE_FORM_DRAWER:
      return { ...state, formDrawerOpen: payload.open };
    case Types.SET_CURRENT:
      return { ...state, current: payload.current };
    case Types.CLEAR_CURRENT:
      return { ...state, current: emptyCurrent };
    case Types.SET_FORM_TITLES:
      return {
        ...state,
        titles: {
          form: payload.formTitle,
          buttonSubmit: payload.buttonSubmitTitle,
        },
      };
    case Types.SET_LIST_DATA:
      return { ...state, list: payload.list };
    case Types.ADD_ITEM_TO_LIST:
      list = ManageList.addFirst(state.list, payload.item);
      return { ...state, list };
    case Types.REMOVE_ITEM_FROM_LIST:
      list = ManageList.remove(state.list, payload.item);
      return { ...state, list };
    case Types.UPDATE_ITEM_FROM_LIST:
      list = ManageList.update(state.list, payload.item);
      return { ...state, list };
    default:
      throw new Error("Unexpected action");
  }
};

const actions = (disparch: React.Dispatch<{ type: Types; payload?: any }>) => ({
  toggleDrawer: (open: boolean) =>
    disparch({ type: Types.TOGGLE_FORM_DRAWER, payload: { open } }),
  toggleLoad: (load: boolean) =>
    disparch({ type: Types.TOGGLE_LOAD, payload: { load } }),
  setCurrent: (current: Event) =>
    disparch({ type: Types.SET_CURRENT, payload: { current } }),
  clearCurrent: () => disparch({ type: Types.CLEAR_CURRENT }),
  setFormTitle: (formTitle: string, buttonSubmitTitle: string) =>
    disparch({
      type: Types.SET_FORM_TITLES,
      payload: { formTitle, buttonSubmitTitle },
    }),
  populateList: (list: Event[]) =>
    disparch({ type: Types.SET_LIST_DATA, payload: { list } }),
  addToList: (item: Event) =>
    disparch({ type: Types.ADD_ITEM_TO_LIST, payload: { item } }),
  removeFromList: (item: Event) =>
    disparch({ type: Types.REMOVE_ITEM_FROM_LIST, payload: { item } }),
  updateFromList: (item: Event) =>
    disparch({ type: Types.UPDATE_ITEM_FROM_LIST, payload: { item } }),
});

async function createOrUpdateItem(
  formData: Event,
  currentSelected: Event,
  toast: any,
  toggleLoad: (load: boolean) => void,
  toggleDrawer: (open: boolean) => void,
  addToList: (item: Event) => void,
  updateFromList: (item: Event) => void
) {
  const isUpdate = !!currentSelected.id;

  try {
    toggleLoad(true);

    if (isUpdate) {
      let newEvent = { ...currentSelected, ...formData };

      newEvent = await EventApi.update(newEvent);

      updateFromList(newEvent);

      ApiAlert.successUpdate(toast, pageName.singular);

      return toggleDrawer(false);
    }

    const event = await EventApi.create(formData);

    addToList(event);

    ApiAlert.successCreate(toast, pageName.singular);

    toggleDrawer(false);
  } catch (e) {
    ApiAlert.errorCreateOrUpdate(e, toast);
  } finally {
    toggleLoad(false);
  }
}

async function loadList(
  toast: any,
  populateList: (list: Event[]) => void,
  toggleLoad: (load: boolean) => void
) {
  toggleLoad(true);

  try {
    const list = await EventApi.findAll();

    populateList(list);
  } catch (e) {
    ApiAlert.errorFindAll(e, toast, pageName.singular);
  } finally {
    toggleLoad(false);
  }
}

async function deleteItem(
  item: Event,
  toast: any,
  toggleLoad: (load: boolean) => void,
  removeFromList: (item: Event) => void
) {
  toggleLoad(true);

  try {
    await EventApi.delete(item);

    removeFromList(item);

    ApiAlert.successDelete(toast, pageName.singular);
  } catch (e) {
    ApiAlert.errorDelete(e, toast, pageName.singular);
  } finally {
    toggleLoad(false);
  }
}

async function downloadReport(
  item: Event,
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

function AdminEventScreen() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const confirmAction = () => buttonRef.current && buttonRef.current.click();

  const [state, disparch] = React.useReducer(reducer, initialState);

  const {
    toggleDrawer,
    clearCurrent,
    setCurrent,
    setFormTitle,
    toggleLoad,
    populateList,
    addToList,
    removeFromList,
    updateFromList,
  } = actions(disparch);

  const toast = useToast();

  React.useEffect(() => {
    loadList(toast, populateList, toggleLoad).then();
  }, []);

  const onFormSend = async (formData: Event) => {
    return createOrUpdateItem(
      formData,
      state.current,
      toast,
      toggleLoad,
      toggleDrawer,
      addToList,
      updateFromList
    );
  };

  const onDelete = (item: Event) => {
    return deleteItem(item, toast, toggleLoad, removeFromList);
  };

  const onCreate = () => {
    setFormTitle(`Adicionar ${pageName.singular}`, "Adicionar");
    clearCurrent();
    toggleDrawer(true);
  };

  const onUpdate = (item: Event) => {
    setFormTitle(`Atualizar ${pageName.singular}`, "Atualizar");
    setCurrent(item);
    toggleDrawer(true);
  };

  const onRequestReport = (item: Event) => {
    return downloadReport(item, toast, toggleLoad);
  };

  return (
    <AdminContentScreen title={pageName.plural} onAdd={onCreate}>
      <EventDataTable
        load={state.load}
        data={state.list}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCreateReport={onRequestReport}
      />
      <FormDrawer
        title={state.titles.form}
        onConfirmAction={confirmAction}
        isOpen={state.formDrawerOpen}
        onClose={() => toggleDrawer(false)}
        load={state.load}
        btnConfirmText={state.titles.buttonSubmit}
      >
        <EventForm
          ref={buttonRef}
          defaultValues={state.current}
          onSubmit={onFormSend}
        />
      </FormDrawer>
    </AdminContentScreen>
  );
}

export default AdminEventScreen;
