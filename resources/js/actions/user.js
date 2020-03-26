import { userService } from '../services/auth';
import {
    SET_USER_DATA,
    CLEAR_USER_DATA,
    FETCHING_USER,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_FAILURE,
} from '../actionTypes/user';

export const setUserData = data => ({
    type: SET_USER_DATA,
    data,
});

export const clearUserData = () => ({
    type: CLEAR_USER_DATA,
});

const fetchingUser = () => ({
    type: FETCHING_USER
});
const fetchingUserSuccess = () => ({
    type: FETCHING_USER_SUCCESS
});
const fetchingUserFailure = () => ({
    type: FETCHING_USER_FAILURE
});

export const fetchUser = () => {
    return dispatch => {
        dispatch(fetchingUser());
        userService.getProfile().then(response => {
            dispatch(fetchingUserSuccess());
            dispatch(setUserData(response.data.user));
        },error => {
            console.log({error});
            dispatch(fetchingUserFailure());
        })
    }
};
