import { combineReducers } from "redux";
import { auth } from "./auth";
import { alert } from "./alert";
import { user } from "./user";
import { message } from "./message";

export default combineReducers({
  auth,
  alert,
  user,
  message
});
