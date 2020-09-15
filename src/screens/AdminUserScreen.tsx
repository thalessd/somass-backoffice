import React from "react";
import AdminContentScreen from "./AdminContentScreen";
import FormDrawer from "../components/shared/FormDrawer";
import { useToast } from "@chakra-ui/core";
import UserForm from "../components/admin/user/UserForm";
import User from "../models/user";
import UserApi from "../services/user.api";
import UserDataTable from "../components/admin/user/UserDataTable";
import { ApiAlert } from "../helpers/api-alert";
import { ManageList } from "../helpers/manage-list";

const pageName = {
  singular: "Usuário",
  plural: "Usuários",
};

enum Types {
  TOGGLE_LOAD = "user/TOGGLE_LOAD",
  TOGGLE_FORM_DRAWER = "user/TOGGLE_FORM_DRAWER",
  SET_CURRENT = "user/SET_CURRENT",
  CLEAR_CURRENT = "user/CLEAR_CURRENT",
  SET_FORM_TITLES = "user/SET_FORM_TITLES",
  SET_LIST_DATA = "user/SET_LIST_DATA",
  ADD_ITEM_TO_LIST = "user/ADD_ITEM_TO_LIST",
  REMOVE_ITEM_FROM_LIST = "user/REMOVE_ITEM_FROM_LIST",
  UPDATE_ITEM_FROM_LIST = "user/UPDATE_ITEM_FROM_LIST",
}

const emptyCurrent = new User("", "", []);

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

  let list: User[];

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
  setCurrent: (current: User) =>
    disparch({ type: Types.SET_CURRENT, payload: { current } }),
  clearCurrent: () => disparch({ type: Types.CLEAR_CURRENT }),
  setFormTitle: (formTitle: string, buttonSubmitTitle: string) =>
    disparch({
      type: Types.SET_FORM_TITLES,
      payload: { formTitle, buttonSubmitTitle },
    }),
  populateList: (list: User[]) =>
    disparch({ type: Types.SET_LIST_DATA, payload: { list } }),
  addToList: (item: User) =>
    disparch({ type: Types.ADD_ITEM_TO_LIST, payload: { item } }),
  removeFromList: (item: User) =>
    disparch({ type: Types.REMOVE_ITEM_FROM_LIST, payload: { item } }),
  updateFromList: (item: User) =>
    disparch({ type: Types.UPDATE_ITEM_FROM_LIST, payload: { item } }),
});

async function createOrUpdateItem(
  formData: User,
  currentSelected: User,
  toast: any,
  toggleLoad: (load: boolean) => void,
  toggleDrawer: (open: boolean) => void,
  addToList: (item: User) => void,
  updateFromList: (item: User) => void
) {
  const isUpdate = !!currentSelected.id;

  try {
    toggleLoad(true);

    if (isUpdate) {
      let newUser = { ...currentSelected, ...formData };

      newUser = await UserApi.updateAdmin(newUser);

      updateFromList(newUser);

      ApiAlert.successUpdate(toast, pageName.singular);

      return toggleDrawer(false);
    }

    const user = await UserApi.createAdmin(formData);

    addToList(user);

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
  populateList: (list: User[]) => void,
  toggleLoad: (load: boolean) => void
) {
  toggleLoad(true);

  try {
    const list = await UserApi.findAll();

    populateList(list);
  } catch (e) {
    ApiAlert.errorFindAll(e, toast, pageName.singular);
  } finally {
    toggleLoad(false);
  }
}

async function deleteItem(
  item: User,
  toast: any,
  toggleLoad: (load: boolean) => void,
  removeFromList: (item: User) => void
) {
  toggleLoad(true);

  try {
    await UserApi.delete(item);

    removeFromList(item);

    ApiAlert.successDelete(toast, pageName.singular);
  } catch (e) {
    ApiAlert.errorDelete(e, toast, pageName.singular);
  } finally {
    toggleLoad(false);
  }
}

function AdminUserScreen() {
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

  const onFormSend = async (formData: User) => {
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

  const onDelete = (item: User) => {
    return deleteItem(item, toast, toggleLoad, removeFromList);
  };

  const onCreate = () => {
    setFormTitle(`Adicionar ${pageName.singular}`, "Adicionar");
    clearCurrent();
    toggleDrawer(true);
  };

  const onUpdate = (item: User) => {
    setFormTitle(`Atualizar ${pageName.singular}`, "Atualizar");
    setCurrent(item);
    toggleDrawer(true);
  };

  return (
    <AdminContentScreen title={pageName.plural} onAdd={onCreate}>
      <UserDataTable
        load={state.load}
        data={state.list}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
      <FormDrawer
        title={state.titles.form}
        onConfirmAction={confirmAction}
        isOpen={state.formDrawerOpen}
        onClose={() => toggleDrawer(false)}
        load={state.load}
        btnConfirmText={state.titles.buttonSubmit}
      >
        <UserForm
          ref={buttonRef}
          defaultValues={state.current}
          onSubmit={onFormSend}
        />
      </FormDrawer>
    </AdminContentScreen>
  );
}

export default AdminUserScreen;
