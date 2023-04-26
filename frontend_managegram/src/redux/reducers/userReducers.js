import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 

    USER_LOGOUT,
} from '../types/userTypes'


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userInfo: userInfoFromStorage
}
// LOGIN REDUCER:
export const userLoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {} // Devuelve un state vacío xq se desloguea, entonces hay que vaciarlo
        default:
            return state

    }
}