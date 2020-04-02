import axios from 'axios';
import { authHeader } from "../helpers";

const baseUrl = '/api/contacts';

const findNew = query => {
    return axios({
        url: `${baseUrl}/search/new?query=${query}`,
        method: 'get',
        headers: authHeader(),
    }).then(response => response);
};

const requestToFriend = id => {
    return axios({
        url: `${baseUrl}/${id}/friends/add`,
        method: 'post',
        headers: authHeader(),
    }).then(response => response);
};

const confirmToFriend = id => {
    return axios({
        url: `${baseUrl}/${id}/friends/confirm`,
        method: 'put',
        headers: authHeader(),
    }).then(response => response);
};

export const contactsService = {
    findNew,
    requestToFriend,
    confirmToFriend,
};

