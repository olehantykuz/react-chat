import { LOGOUT } from '../actionTypes/auth';
import { userService } from '../services/auth';
import { history } from '../history';
import { clearUsers } from './users';
import { clearChats } from './chats';
import { clearRooms } from './rooms';
import { clearMessages } from './messages';
import { clearAllErrors } from './errors';
import { clearContacts } from './contacts';

export const logout = () => ({
    type: LOGOUT,
});

export const logoutUser = () => {
    return dispatch => {
        userService.logout().then(() => {
            dispatch(clearContacts());
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
