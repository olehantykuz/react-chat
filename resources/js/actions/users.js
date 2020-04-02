import { CLEAR_USERS, REMOVE_USER, SET_USER, ADD_USERS } from '../actionTypes/users';

export const setUser = (id, data) => ({
    type: SET_USER,
    id,
    data
});

export const addUsers = items => ({
    type: ADD_USERS,
    items
});

export const removeUser = id => ({
    type: REMOVE_USER,
    id
});

export const clearUsers = () => ({
    type: CLEAR_USERS
});

