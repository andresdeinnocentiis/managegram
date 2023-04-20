import {
    SET_THEME_REQUEST,
    SET_THEME_SUCCESS,
    SET_THEME_FAIL 

} from '../types/themeTypes'

// Cada Reducer tiene su propio state.

const themeFromStorage = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'light'

const initialState = {
    theme: themeFromStorage,
    error: null,
    loading: false
};

export const themeChangeReducer = (state = initialState, action) => {
    switch(action.type) {

        case SET_THEME_REQUEST:
            return {loading:true}

        case SET_THEME_SUCCESS:
            return {loading:false, success: true, theme: action.payload }

        case SET_THEME_FAIL:
            return {loading: false, error:action.payload}
        
        default:
            return state
    }
}