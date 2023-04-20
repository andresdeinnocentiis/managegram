import {
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL, 
    PRODUCT_CREATE_RESET, 
} from '../types/productTypes'
// Cada Reducer tiene su propio state.

const initialState = {
    products: [],
    error: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}