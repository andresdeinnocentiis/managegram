import { combineReducers } from "redux";
import productsReducers from "./productReducers";
import { themeChangeReducer } from "./themeReducers";
import { userLoginReducer } from "./userReducers";


export default combineReducers({
    products: productsReducers,
    theme: themeChangeReducer,
    userLogin: userLoginReducer,
})