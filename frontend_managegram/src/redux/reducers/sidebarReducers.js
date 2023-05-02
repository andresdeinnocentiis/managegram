import {
    SET_SIDEBAR_STATE_REQUEST,
    SET_SIDEBAR_STATE_SUCCESS, 
    SET_SIDEBAR_STATE_FAIL, 
} from '../types/sidebarTypes'

// Cada Reducer tiene su propio state.

const initialState = {
    sidebarOpen: '',
    error: null,
    loading: false
};

export const sidebarOpenReducer = (state = initialState, action) => {
    switch(action.type) {

        case SET_SIDEBAR_STATE_REQUEST:
            return {loading:true}

        case SET_SIDEBAR_STATE_SUCCESS:
            return {loading:false, success: true, sidebarOpen: action.payload }

        case SET_SIDEBAR_STATE_FAIL:
            return {loading: false, error:action.payload}
        
        default:
            return state
    }
}