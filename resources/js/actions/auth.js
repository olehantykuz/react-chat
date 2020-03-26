import { normalize } from 'normalizr';
import { userSchema } from '../schemas';

import { userService } from '../services/auth';
import { clearUsers } from './users';
import { processServerErrors } from '../helpers';
import { history } from '../history';
import { setUser } from './users';

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
    SET_SERVER_ERRORS,
    CLEAR_SERVER_ERRORS,

    FETCHING_AUTH_USER,
    FETCHING_AUTH_USER_SUCCESS,
    FETCHING_AUTH_USER_FAILURE,
} from '../actionTypes/auth'

const requestLogin = () => ({
    type: REQUEST_LOGIN
});
const loggedIn = () => ({
    type: LOGIN_SUCCESS
});
const loginFailure = () => ({
    type: LOGIN_FAILURE
});
export const clearLoginStatus = () => ({
    type: CLEAR_LOGIN_STATUS
});

const requestRegister = () => ({
    type: REQUEST_REGISTER
});
const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});
const registerFailure = () => ({
    type: REGISTER_FAILURE
});
export const clearRegisterStatus = () => ({
    type: CLEAR_REGISTER_STATUS
});

const setServerErrors = (field, value) => ({
    type: SET_SERVER_ERRORS,
    field,
    value
});
export const clearServerErrors = field => ({
    type: CLEAR_SERVER_ERRORS,
    field
});
export const logout = () => ({
    type: LOGOUT,
});

const fetchingAuthUser = () => ({
    type: FETCHING_AUTH_USER
});
const fetchingAuthUserSuccess = id => ({
    type: FETCHING_AUTH_USER_SUCCESS,
    id
});
const fetchingAuthUserFailure = () => ({
    type: FETCHING_AUTH_USER_FAILURE
});

export const login = data => {
    return dispatch => {
        dispatch(clearServerErrors('login'));
        dispatch(requestLogin());
        userService.login(data).then(response => {
            dispatch(loggedIn());
            dispatch(fetchUser());
            dispatch(clearLoginStatus());
            history.push('/');
        }, error => {
            dispatch(loginFailure());
            const err = processServerErrors(error.response.data.errors || [error.response.data.error]);
            dispatch(setServerErrors('login', err));
        })
    }
};

export const register = data => {
    return dispatch => {
        dispatch(clearServerErrors('register'));
        dispatch(requestRegister());
        userService.register(data).then(response => {
            dispatch(registerSuccess());
            history.push('/login')
        }, error => {
            dispatch(registerFailure());
            const err = processServerErrors(error.response.data.errors || [error.response.data.error]);
            dispatch(setServerErrors('register', err));
        })
    }
};

export const logoutUser = () => {
    return dispatch => {
        userService.logout().then(() => {
            dispatch(clearUsers());
            dispatch(logout());
            history.push('/')
        });
    }
};

export const fetchUser = () => {
    return dispatch => {
        dispatch(fetchingAuthUser());
        userService.getProfile().then(response => {
            const normalizedResponse = normalize(response.data.user, userSchema);
            const id = normalizedResponse.result;
            const user = normalizedResponse.entities.users[id];
            dispatch(setUser(id, user));
            dispatch(fetchingAuthUserSuccess(id));
        },error => {
            console.log({error});
            dispatch(fetchingAuthUserFailure());
        })
    }
};
