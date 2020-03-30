// @flow

import { combineReducers } from "redux";
import tableReducer from "./tableReducer";
import type { ActionType } from "../actions/tableActions";

export default combineReducers<Object, ActionType>({
  table: tableReducer
});
