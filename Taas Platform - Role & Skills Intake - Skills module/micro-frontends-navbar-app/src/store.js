/* global process */
/**
 * Configure Redux Store
 */
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { authenticate } from "./services/auth";
import thunk from "redux-thunk";

const middleware = [thunk];
// enable Redux Logger in in DEV environment
if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger();
  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

authenticate(store);

export default store;
