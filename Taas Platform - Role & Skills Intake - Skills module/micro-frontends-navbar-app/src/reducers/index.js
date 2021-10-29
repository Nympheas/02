/**
 * Root Redux Store Reducer
 */
import { combineReducers } from "redux";
import authReducer from "./auth";
import menuReducer from "./menu";
import notificationsReducer from "./notifications";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
