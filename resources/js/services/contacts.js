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

export const contactsService = {
    findNew
};

