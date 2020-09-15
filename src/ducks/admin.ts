import { AnyAction } from "redux";
import User from "../models/user";

export const Types = {
  USER_LOGGED: "admin/USER_LOGGED",
  USER_LOGOUT: "admin/USER_LOGOUT",
};

const INITIAL_STATE = {
  name: "",
  isLogged: false,
};

export default function admin(state = INITIAL_STATE, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case Types.USER_LOGGED:
      return { ...state, name: payload.name, isLogged: true };
    case Types.USER_LOGOUT:
      return { ...state, name: "", isLogged: false };
    default:
      return state;
  }
}

export const Creators = {
  userLogged: (user: User) => ({
    type: Types.USER_LOGGED,
    payload: { name: user.name },
  }),
  userLogout: () => ({
    type: Types.USER_LOGOUT,
  }),
};
