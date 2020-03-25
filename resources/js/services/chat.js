import axios from 'axios';
import { authHeader } from "../helpers";

const baseUrl = '/api/chat';

const fetchMessages = () => {
    return axios({
        url: `${baseUrl}/messages`,
        method: 'get',
        headers: authHeader(),
    }).then(response => response);
};

const sendMessage = (text) => {
    return axios({
        url: `${baseUrl}/messages`,
        method: 'post',
        data: {text},
        headers: authHeader(),
    }).then(response => response);
};

export const chatService = {
    fetchMessages,
    sendMessage,
};
