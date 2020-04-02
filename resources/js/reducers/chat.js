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

const initialState = {
    messages: [],
    sendingMessage: false,
    sendingStatus: null,
    fetchingMessage: false,
    fetchingStatus: null,
};

const chat =  (state=initialState, action) => {
    switch (action.type) {
        case SET_CHAT_MESSAGES: {
            return {...state, messages: action.messages}
        }
        case FETCHING_CHAT_MESSAGES: {
            return {...state, fetchingMessage: true}
        }
        case FETCHING_CHAT_MESSAGES_SUCCESS: {
            return {...state, fetchingMessage: false, fetchingStatus: true}
        }
        case FETCHING_CHAT_MESSAGES_FAILURE: {
            return {...state, fetchingMessage: false, fetchingStatus: false}
        }
        case SENDING_CHAT_MESSAGE: {
            return {...state, sendingMessage: true}
        }
        case SENDING_CHAT_MESSAGE_SUCCESS: {
            return {...state, sendingMessage: false, sendingStatus: true}
        }
        case SENDING_CHAT_MESSAGE_FAILURE: {
            return {...state, sendingMessage: false, sendingStatus: false}
        }
        case ADD_CHAT_MESSAGE: {
            const { messages } = state;
            messages.push(action.id);

            return {...state, messages}
        }
        case CLEAR_CHAT_MESSAGES: {
            return initialState;
        }
        default:
            return state;
    }
};

export default chat;
