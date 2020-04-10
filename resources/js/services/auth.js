import axios from 'axios';
import { authHeader } from "../helpers";

const baseUrl = '/api/auth';

const register = data => {
    return axios({
        url: `${baseUrl}/register`,
        method: 'post',
        data,
    }).then(response => response);
};

const login = data => {
    return axios({
        url: `${baseUrl}/login`,
        method: 'post',
        data,
    }).then(response => {
        if (response.status < 400) {
            localStorage.setItem('authToken', JSON.stringify(response.data.access_token));
        }

        return response;
    });
};

const logout = () => {
    return axios({
        url: `${baseUrl}/logout`,
        method: 'post',
        headers: authHeader(),
    }).then(response => response).finally(() => {
        localStorage.removeItem('authToken');
    });
};

const getAuthUser = () => {
    return axios({
        url: `${baseUrl}/me`,
        method: 'get',
        headers: authHeader(),
    }).then(response => response);
};

export const userService = {
    login,
    logout,
    register,
    getAuthUser,
};
