import {
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL, 
    PRODUCT_CREATE_RESET, 

    PRODUCTS_GET_REQUEST,
    PRODUCTS_GET_SUCCESS, 
    PRODUCTS_GET_FAIL, 
    PRODUCTS_GET_RESET, 
} from '../types/productTypes'
// Cada Reducer tiene su propio state.

const initialState = {
    products: [],
    error: null,
    loading: false
}

export const getUserProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCTS_GET_REQUEST:
            return {loading:true}

        case PRODUCTS_GET_SUCCESS:
            return {loading:false, products:action.payload}

        case PRODUCTS_GET_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCTS_GET_RESET:
            return {}

        default:
            return state
    }
}