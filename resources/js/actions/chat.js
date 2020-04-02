import { normalize } from 'normalizr';
import { messageSchema } from '../schemas';

import { chatService } from '../services/chat';
import {
    SET_CHAT_MESSAGES,
    FETCHING_CHAT_MESSAGES,
    FETCHING_CHAT_MESSAGES_SUCCESS,
    FETCHING_CHAT_MESSAGES_FAILURE,
    SENDING_CHAT_MESSAGE,
    SENDING_CHAT_MESSAGE_SUCCESS,
    SENDING_CHAT_MESSAGE_FAILURE,
    ADD_CHAT_MESSAGE,
    CLEAR_CHAT_MESSAGES,
} from '../actionTypes/chat';
import { addUsers } from './users';
import { addMessages } from './messages';

const setChatMessages = messages => ({
    type: SET_CHAT_MESSAGES,
    messages
});
const fetchingChatMessages = () => ({
    type: FETCHING_CHAT_MESSAGES
});
const fetchingChatMessagesSuccess = () => ({
    type: FETCHING_CHAT_MESSAGES_SUCCESS
});
const fetchingChatMessagesFailure = () => ({
    type: FETCHING_CHAT_MESSAGES_FAILURE
});

export const addChatMessage = id => ({
    type: ADD_CHAT_MESSAGE,
    id
});
const sendingChatMessage = () => ({
    type: SENDING_CHAT_MESSAGE,
});
const sendingChatMessageSuccess = () => ({
    type: SENDING_CHAT_MESSAGE_SUCCESS,
});
const sendingChatMessageFailure = () => ({
    type: SENDING_CHAT_MESSAGE_FAILURE,
});

export const clearChatMessages = () => ({
    type: CLEAR_CHAT_MESSAGES
});

export const sendMessage = message => {
    return dispatch => {
        dispatch(sendingChatMessage());
        chatService.sendMessage(message).then(
            response => {
                const normalizedMessage = normalize(response.data.message, messageSchema);
                dispatch(addMessages(normalizedMessage.entities.messages));
                dispatch(addChatMessage(normalizedMessage.result));
                dispatch(sendingChatMessageSuccess());
            },
            error => {
                dispatch(sendingChatMessageFailure());
            }
        )
    }
};

export const addNewChatMessage = message => {
    return dispatch => {
        const normalizedMessage = normalize(message, messageSchema);
        dispatch(addUsers(normalizedMessage.entities.users));
        dispatch(addMessages(normalizedMessage.entities.messages));
        dispatch(addChatMessage(message.id));
    }
};

export const fetchMessages = () => {
    return dispatch => {
        dispatch(fetchingChatMessages());
        chatService.fetchMessages().then(
            response => {
                const normalizedMessages = normalize(response.data.messages, [messageSchema]);
                if (normalizedMessages.result.length > 0) {
                    dispatch(addUsers(normalizedMessages.entities.users));
                    dispatch(addMessages(normalizedMessages.entities.messages));
                    dispatch(setChatMessages(normalizedMessages.result));
                }
                dispatch(fetchingChatMessagesSuccess());
            },
            error => {
                dispatch(fetchingChatMessagesFailure());
            }
        )
    }
};
