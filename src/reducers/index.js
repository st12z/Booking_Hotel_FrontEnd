import { loginReducer } from "./LoginReducer";
import { combineReducers } from "redux";
import { SaveUser } from "./SaveUserReducer";
export const allReducers=combineReducers({
  login:loginReducer,
  user:SaveUser,
});