import { combineReducers } from "redux";
import productsReducers from "./productsReducers";
import { themeChangeReducer } from "./themeReducers";


export default combineReducers({
    products: productsReducers,
    theme: themeChangeReducer
})