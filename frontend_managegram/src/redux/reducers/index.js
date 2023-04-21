import { combineReducers } from "redux";
import productsReducers from "./productReducers";
import { themeChangeReducer } from "./themeReducers";


export default combineReducers({
    products: productsReducers,
    theme: themeChangeReducer
})