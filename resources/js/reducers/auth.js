import {
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_LOGIN_STATUS,
    LOGOUT,
    REQUEST_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    CLEAR_REGISTER_STATUS,
    FETCHING_AUTH_USER,
    FETCHING_AUTH_USER_SUCCESS,
    FETCHING_AUTH_USER_FAILURE,
} from '../actionTypes/auth'

const initialState = {
    id: null,
    isRequestRegister: false,
    registerStatus: null,
    isRequestLogin: false,
    loggedIn: false,
    loginStatus: null,
    fetchingAuthUser: false,
    fetchingAuthUserStatus: null
};

const auth = (state= initialState, action) => {
    switch (action.type) {
        case REQUEST_LOGIN: {
            return {...state, isRequestLogin: true}
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isRequestLogin: false,
                loggedIn: true,
                loginStatus: true,
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                isRequestLogin: false,
                loggedIn: false,
                loginStatus: false,
                id: null
            }
        }
        case CLEAR_LOGIN_STATUS: {
            return {...state, loginStatus: null}
        }
        case LOGOUT: {
            return initialState;
        }
        case REQUEST_REGISTER: {
            return {...state, isRequestRegister: true}
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                isRequestRegister: false,
                registerStatus: true
            }
        }
        case REGISTER_FAILURE: {
            return {
                ...state,
                isRequestRegister: false,
                registerStatus: false
            }
        }
        case CLEAR_REGISTER_STATUS: {
            return {...state, registerStatus: null}
        }
        case FETCHING_AUTH_USER: {
            return {...state, fetchingAuthUser: true, id: action.id};
        }
        case FETCHING_AUTH_USER_SUCCESS: {
            return {...state, fetchingAuthUser: false, fetchingAuthUserStatus: true, id: action.id};
        }
        case FETCHING_AUTH_USER_FAILURE: {
            return {...state, fetchingAuthUser: false, fetchingAuthUserStatus: false, id: null};
        }

        default:
            return state;
    }
};

export default auth;
