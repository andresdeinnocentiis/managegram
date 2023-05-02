import { combineReducers } from "redux";
import productsReducers from "./productReducers";
import { themeChangeReducer } from "./themeReducers";
import { userLoginReducer } from "./userReducers";
import { sidebarOpenReducer } from "./sidebarReducers";


export default combineReducers({
    products: productsReducers,
    theme: themeChangeReducer,
    userLogin: userLoginReducer,
    sidebarOpen: sidebarOpenReducer,
})