import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./App";

import reducers from "./redux/reducers";

import "./style.scss";

const composeEnhancers =
  typeof window !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

let state;
if (typeof window !== "undefined") {
  state = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
}

const store = createStore(reducers, state, composeEnhancers(applyMiddleware()));

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
