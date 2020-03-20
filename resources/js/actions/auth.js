import { userService } from '../services/auth';
import { setUserData, clearUserData } from './user';
import { processServerErrors } from '../helpers';
import { history } from '../app';

const requestLogin = () => ({
    type: 'REQUEST_LOGIN'
});
const loggedIn = () => ({
    type: 'LOGIN_SUCCESS'
});
const loginFailure = () => ({
    type: 'LOGIN_FAILURE'
});
export const clearLoginStatus = () => ({
    type: 'CLEAR_LOGIN_STATUS'
});

const requestRegister = () => ({
    type: 'REQUEST_REGISTER'
});
const registerSuccess = () => ({
    type: 'REGISTER_SUCCESS'
});
const registerFailure = () => ({
    type: 'REGISTER_FAILURE'
});
export const clearRegisterStatus = () => ({
    type: 'CLEAR_REGISTER_STATUS'
});

const setServerErrors = (field, value) => ({
    type: 'SET_SERVER_ERRORS',
    field,
    value
});
export const clearServerErrors = field => ({
    type: 'CLEAR_SERVER_ERRORS',
    field
});
export const logout = () => ({
    type: 'LOGOUT',
});

export const login = data => {
    return dispatch => {
        dispatch(clearServerErrors('login'));
        dispatch(requestLogin());
        userService.login(data).then(response => {
            dispatch(loggedIn());
            dispatch(setUserData(response.data.user));
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
            dispatch(clearUserData());
            dispatch(logout());
            history.push('/')
        });
    }
};
