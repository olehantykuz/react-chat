import {
    DEFAULT_INIT_CHATS,
    CLEAR_CHATS,
    TOGGLE_CHAT,
    ADD_MESSAGE_TO_CHAT,
    FETCHED_CONVERSATION_SUCCESS,
    FETCHED_CONVERSATION_FAILURE,
    FETCHING_CONVERSATION,
    SENDING_CHAT_MESSAGE,
    SENDING_CHAT_MESSAGE_SUCCESS,
    SENDING_CHAT_MESSAGE_FAILURE,
    SET_CHAT_MESSAGES
} from '../actionTypes/chats';
import {chatService} from '../services/chat';
import {normalize} from 'normalizr';
import {messageSchema} from '../schemas';
import {addUsers} from './users';
import {addMessages} from './messages';

export const initChats = ids => ({
    type: DEFAULT_INIT_CHATS,
    ids
});
export const clearChats = () => ({
    type: CLEAR_CHATS,
});
export const toggleChat = id => ({
    type: TOGGLE_CHAT,
    id,
});
const fetchingConversation = id => ({
    type: FETCHING_CONVERSATION,
    id
});
const fetchedConversationSuccess = id => ({
    type: FETCHED_CONVERSATION_SUCCESS,
    id
});
const fetchedConversationFailure = id => ({
    type: FETCHED_CONVERSATION_FAILURE,
    id
});
const sendingMessage = id => ({
    type: SENDING_CHAT_MESSAGE,
    id
});
const sendingMessageSuccess = id => ({
    type: SENDING_CHAT_MESSAGE_SUCCESS,
    id
});
const sendingMessageFailure = id => ({
    type: SENDING_CHAT_MESSAGE_FAILURE,
    id
});
export const setMessagesToChat = (id, messages) => ({
    type: SET_CHAT_MESSAGES,
    id,
    messages
});
export const addMessageToConversation = (id, message) => ({
    type: ADD_MESSAGE_TO_CHAT,
    id,
    message
});

export const fetchChatMessages = roomId => {
    return dispatch => {
        dispatch(fetchingConversation(roomId));
        chatService.fetchMessages(roomId).then(
            response => {
                const normalizedMessages = normalize(response.data.messages, [messageSchema]);
                if (normalizedMessages.result.length > 0) {
                    dispatch(addUsers(normalizedMessages.entities.users));
                    dispatch(addMessages(normalizedMessages.entities.messages));
                    dispatch(setMessagesToChat(roomId, normalizedMessages.result));
                }
                dispatch(fetchedConversationSuccess(roomId));
            },
            error => {
                console.log({error});
                dispatch(fetchedConversationFailure(roomId));
            }
        )
    }
};

export const sendMessage = (message, roomId) => {
    return dispatch => {
        dispatch(sendingMessage(roomId));
        chatService.sendMessage(message, roomId).then(
            response => {
                const normalizedMessage = normalize(response.data.message, messageSchema);
                dispatch(addMessages(normalizedMessage.entities.messages));
                dispatch(addMessageToConversation(roomId, normalizedMessage.result));
                dispatch(sendingMessageSuccess(roomId));
            },
            error => {
                dispatch(sendingMessageFailure(roomId));
            }
        )
    }
};

export const addMessageToRoom = (message, roomId) => {
    return dispatch => {
        const normalizedMessage = normalize(message, messageSchema);
        dispatch(addUsers(normalizedMessage.entities.users));
        dispatch(addMessages(normalizedMessage.entities.messages));
        dispatch(addMessageToConversation(roomId, message.id));
    }
};