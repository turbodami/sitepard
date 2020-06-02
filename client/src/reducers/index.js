import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import site from "./site";

export default combineReducers({
  alert,
  auth,
  site,
});
