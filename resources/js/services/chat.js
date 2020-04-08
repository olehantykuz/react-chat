import axios from 'axios';
import { authHeader } from "../helpers";

const baseUrl = '/api/rooms';

const fetchMessages = roomId => {
    return axios({
        url: `${baseUrl}/${roomId}/conversation`,
        method: 'get',
        headers: authHeader(),
    }).then(response => response);
};

const sendMessage = (text, roomId) => {
    return axios({
        url: `${baseUrl}/${roomId}/conversation`,
        method: 'post',
        data: {text},
        headers: authHeader(),
    }).then(response => response);
};

export const chatService = {
    fetchMessages,
    sendMessage,
};
