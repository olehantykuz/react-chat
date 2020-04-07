import {
    DEFAULT_INIT_CHATS,
    FETCHING_CONVERSATION,
    FETCHED_CONVERSATION_SUCCESS,
    FETCHED_CONVERSATION_FAILURE,
    SENDING_CHAT_MESSAGE,
    SENDING_CHAT_MESSAGE_FAILURE,
    SENDING_CHAT_MESSAGE_SUCCESS,
    SET_CHAT_MESSAGES,
    ADD_MESSAGE_TO_CHAT,
    TOGGLE_CHAT,
    CLEAR_CHATS,
} from '../actionTypes/chats';

const initialState = {
    active: null,
};

const chats = (state = initialState, action) => {
    switch (action.type) {
        case DEFAULT_INIT_CHATS: {
            const { ids } = action;
            const initial = {};
            ids.forEach(id => {
                initial[id] = {
                    fetchingConversation: false,
                    fetchingConversationStatus: null,
                    sendingMessage: false,
                    sendingMessageStatus: null,
                    messages: [],
                    newMessages: [],
                }
            });

            return {...state, ...initial};
        }
        case FETCHING_CONVERSATION: {
            const {id} = action;
            const chat = Object.assign({}, state[id]);
            chat.fetchingConversation = true;

            return {...state, [id]: chat};
        }
        case FETCHED_CONVERSATION_SUCCESS: {
            const {id} = action;
            const chat = Object.assign({}, state[id]);
            chat.fetchingConversation = false;
            chat.fetchingConversationStatus = true;

            return {...state, [id]: chat};
        }
        case FETCHED_CONVERSATION_FAILURE: {
            const {id} = action;
            const chat = Object.assign({}, state[id]);
            chat.fetchingConversation = false;
            chat.fetchingConversationStatus = false;

            return {...state, [id]: chat};
        }
        case SENDING_CHAT_MESSAGE: {
            const {id} = action;
            const chat = Object.assign({}, state[id]);
            chat.sendingMessage = true;

            return {...state, [id]: chat};
        }
        case SENDING_CHAT_MESSAGE_SUCCESS: {
            const {id} = action;
            const chat = Object.assign({}, state[id]);
            chat.sendingMessage = false;
            chat.sendingMessageStatus = true;

            return {...state, [id]: chat};
        }
        case SENDING_CHAT_MESSAGE_FAILURE: {
            const {id} = action;
            const chat = Object.assign({}, state[id]);
            chat.sendingMessage = false;
            chat.sendingMessageStatus = false;

            return {...state, [id]: chat};
        }
        case TOGGLE_CHAT:
            return {...state, active: action.id};
        case SET_CHAT_MESSAGES: {
            const {id, messages} = action;
            const chat = Object.assign({}, state[id]);
            chat.messages = messages;

            return {...state, [id]: chat};
        }
        case ADD_MESSAGE_TO_CHAT: {
            const { id, message } = action;
            const { active } = state;
            const chat = Object.assign({}, state[id]);
            if (active === id) {
                chat.messages.push(message);
            } else {
                chat.newMessages.push(message);
            }

            return {...state, [id]: chat};
        }
        case CLEAR_CHATS:
            return initialState;
        default:
            return state;
    }
};

export default chats;
