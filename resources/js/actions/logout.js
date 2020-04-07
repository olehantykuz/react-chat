import { LOGOUT } from '../actionTypes/auth';
import { userService } from '../services/auth';
import { history } from '../history';
import { clearUsers } from './users';
import { clearChats } from './chats';
import { clearRooms } from './rooms';
import { clearMessages } from './messages';
import { clearAllErrors } from './errors';

export const logout = () => ({
    type: LOGOUT,
});

export const logoutUser = () => {
    return dispatch => {
        userService.logout().then(() => {
            dispatch(clearChats());
            dispatch(logout());
            dispatch(clearUsers());
            dispatch(clearMessages());
            dispatch(clearAllErrors());
            dispatch(clearRooms());
            history.push('/')
        });
    }
};
