import { combineReducers, createStore } from "redux";
import admin from "./admin";

const reducers = combineReducers({
  admin,
});

export default createStore(reducers);
