import { SET_MESSAGE, REMOVE_MESSAGE, CLEAR_MESSAGES, ADD_MESSAGES } from '../actionTypes/messages';

export const setMessage = (id, data) => ({
    type: SET_MESSAGE,
    id,
    data
});

export const addMessages = items => ({
    type: ADD_MESSAGES,
    items
});

export const removeMessage = id => ({
    type: REMOVE_MESSAGE,
    id
});

export const clearMessages = () => ({
    type: CLEAR_MESSAGES
});
