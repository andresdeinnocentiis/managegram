import { combineReducers } from "redux";
import { getUserProductsReducer } from "./productReducers";
import { themeChangeReducer } from "./themeReducers";
import { userLoginReducer } from "./userReducers";
import { sidebarOpenReducer } from "./sidebarReducers";


export default combineReducers({
    products: getUserProductsReducer,
    theme: themeChangeReducer,
    userLogin: userLoginReducer,
    sidebarOpen: sidebarOpenReducer,
})