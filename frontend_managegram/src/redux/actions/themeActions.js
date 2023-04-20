import {
    SET_THEME_REQUEST,
    SET_THEME_SUCCESS, 
    SET_THEME_FAIL, 
} from '../types/themeTypes'

// Change theme:
export const changeTheme = (newTheme) => async (dispatch, getState) => {
    try {

        dispatch({
            type: SET_THEME_REQUEST
        })

        const {
            theme: {theme}
        } = getState()
    
    
        dispatch({
            type: SET_THEME_SUCCESS,
            payload: newTheme
        })

    } catch(error) {
        dispatch({
            type: SET_THEME_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}