// @flow

import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import reducers from "./redux/reducers";
import "./index.css";

let state;
if (typeof window !== "undefined") {
  state = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
}

const store = createStore(
  reducers,
  state,
  composeWithDevTools(applyMiddleware())
);

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
}
