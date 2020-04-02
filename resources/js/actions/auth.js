import { normalize } from 'normalizr';
import { userSchemaWithContacts } from '../schemas';

import { userService } from '../services/auth';
import { history } from '../history';
import { clearServerErrors, setErrors } from './errors';
import { addUsers } from './users';
import { setPendingContacts, setFriendsContacts, setRequestsContacts } from './contacts';

import {
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_LOGIN_STATUS,
    REQUEST_REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    CLEAR_REGISTER_STATUS,
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
            dispatch(setErrors('login', error));
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
            dispatch(setErrors('register', error));
        })
    }
};

export const fetchUser = () => {
    return dispatch => {
        dispatch(fetchingAuthUser());
        userService.getAuthUser().then(response => {
            const normalizedResponse = normalize(response.data.user, userSchemaWithContacts);
            const id = normalizedResponse.result;
            const { users } = normalizedResponse.entities;
            const user = users[id];
            dispatch(addUsers(users));
            user.hasOwnProperty('requestedFriendsTo') && dispatch(setPendingContacts(user.requestedFriendsTo));
            user.hasOwnProperty('requestFriendsBy') && dispatch(setRequestsContacts(user.requestFriendsBy));
            user.hasOwnProperty('friends') && dispatch(setFriendsContacts(user.friends));
            dispatch(fetchingAuthUserSuccess(id));
        },error => {
            console.log({error});
            dispatch(fetchingAuthUserFailure());
        })
    }
};
