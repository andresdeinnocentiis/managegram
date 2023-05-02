import {
    SET_SIDEBAR_STATE_REQUEST,
    SET_SIDEBAR_STATE_SUCCESS, 
    SET_SIDEBAR_STATE_FAIL, 
} from '../types/sidebarTypes'

// Change theme:
export const openSidebar = (newSidebarOpen) => async (dispatch, getState) => {
    try {

        dispatch({
            type: SET_SIDEBAR_STATE_REQUEST
        })

        const {
            sidebarOpen: {sidebarOpen}
        } = getState()
    
    
        dispatch({
            type: SET_SIDEBAR_STATE_SUCCESS,
            payload: newSidebarOpen
        })


    } catch(error) {
        dispatch({
            type: SET_SIDEBAR_STATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}