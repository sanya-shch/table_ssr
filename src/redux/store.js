// @flow

import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import type { Store as AppState } from "./reducers/tableReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import type { Store } from "redux";
import type { ActionType } from "./actions/tableActions";

export default () => {
  const store: Store<AppState, ActionType> = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware())
  );
  return store;
};
