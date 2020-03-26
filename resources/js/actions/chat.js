import { chatService } from '../services/chat';
import {
    SET_MESSAGES,
    FETCHING_MESSAGES,
    FETCHING_MESSAGES_SUCCESS,
    FETCHING_MESSAGES_FAILURE,
    SENDING_MESSAGE,
    SENDING_MESSAGE_SUCCESS,
    SENDING_MESSAGE_FAILURE,
    ADD_MESSAGE,
    CLEAR_MESSAGES,
} from '../actionTypes/chat';

const setMessages = messages => ({
    type: SET_MESSAGES,
    messages
});
const fetchingMessages = () => ({
    type: FETCHING_MESSAGES
});
const fetchingMessagesSuccess = () => ({
    type: FETCHING_MESSAGES_SUCCESS
});
const fetchingMessagesFailure = () => ({
    type: FETCHING_MESSAGES_FAILURE
});

export const addMessage = message => ({
    type: ADD_MESSAGE,
    message
});
const sendingMessage = () => ({
    type: SENDING_MESSAGE,
});
const sendingMessageSuccess = () => ({
    type: SENDING_MESSAGE_SUCCESS,
});
const sendingMessageFailure = () => ({
    type: SENDING_MESSAGE_FAILURE,
});

export const clearMessages = () => ({
    type: CLEAR_MESSAGES
});

export const sendMessage = message => {
    return dispatch => {
        dispatch(sendingMessage());
        chatService.sendMessage(message).then(
            response => {
                dispatch(addMessage(response.data.message));
                dispatch(sendingMessageSuccess());
            },
            error => {
                dispatch(sendingMessageFailure());
            }
        )
    }
};

export const fetchMessages = () => {
    return dispatch => {
        dispatch(fetchingMessages());
        chatService.fetchMessages().then(
            response => {
                dispatch(setMessages(response.data.messages));
                dispatch(fetchingMessagesSuccess());
            },
            error => {
                dispatch(fetchingMessagesFailure());
            }
        )
    }
};
