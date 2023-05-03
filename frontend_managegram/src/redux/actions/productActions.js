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

import { getAPI } from '../../axios-api'

// Create new product:
export const createProduct = (product) => async (dispatch, getState) => {

}

// Get all the user's products
export const getUserProducts = () => async(dispatch, getState) => {
    
    try {
        dispatch({type: PRODUCTS_GET_REQUEST})

        const {
            userLogin: {userInfo}
        } = getState()



        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await getAPI.get(`/api/products/user/${userInfo.id}/`,
            config
        )

        dispatch({
            type:PRODUCTS_GET_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCTS_GET_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}