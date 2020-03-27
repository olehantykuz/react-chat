import { LOGOUT } from '../actionTypes/auth';
import { userService } from '../services/auth';
import { history } from '../history';
import { clearUsers } from './users';
import { clearChatMessages } from './chat';
import { clearMessages } from './messages';

export const logout = () => ({
    type: LOGOUT,
});

export const logoutUser = () => {
    return dispatch => {
        userService.logout().then(() => {
            dispatch(clearChatMessages());
            dispatch(logout());
            dispatch(clearUsers());
            dispatch(clearMessages());
            history.push('/')
        });
    }
};
