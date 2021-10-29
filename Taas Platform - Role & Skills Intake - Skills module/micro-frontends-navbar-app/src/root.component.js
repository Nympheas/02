/**
 * Root component.
 */
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { createHistory, LocationProvider } from "@reach/router";

// History for location provider
const history = createHistory(window);

export default function Root() {
  return (
    <LocationProvider history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocationProvider>
  );
}
