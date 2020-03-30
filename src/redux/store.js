import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";

const composeEnhancers =
  typeof window !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export default () => createStore(reducers, {}, composeEnhancers(applyMiddleware()));

