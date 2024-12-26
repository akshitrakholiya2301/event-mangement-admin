import { combineReducers } from "redux";
import appReducer from "./Loader/loader.reducer";

import genericReducer from "./generic/generic.reducer";
import loaderReducer from "./Loader/loader.reducer";
import LoginReducer from "./Login/login.reducer";
import ForgetPasswordReducer from "./forgotPassword/forgotPassword.reducer";
import DonorManagementReducer from "./donorManagement/donorManagement.reducer";
import CharityManagementReducer from "./charityManagement/charityManagement.reducer";
import BlogsManagementReducer from "./blogManagement/blogManagement.reducer";
import SettingsReducer from "./settings/settings.reducer";
/**Combining multiple reducers into a single root reducer  */
const rootReducer = combineReducers({
  genericReducer,
  LoginReducer,
  ForgetPasswordReducer,
  loaderReducer,
  CharityManagementReducer,
  BlogsManagementReducer,
  DonorManagementReducer,
  SettingsReducer
});
/** Defining types for better type safety */
export type rootReducerType = ReturnType<typeof rootReducer>;
export type LoaderReducerType = ReturnType<typeof loaderReducer>;
export type genericReducerType = ReturnType<typeof genericReducer>;
export type CharityManagementReducerType = ReturnType<typeof CharityManagementReducer>;
export default rootReducer;
