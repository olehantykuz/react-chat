const initialState = {
    messages: [],
    sendingMessage: false,
    sendingStatus: null,
    fetchingMessage: false,
    fetchingStatus: null,
};

const chat =  (state=initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGES': {
            return {...state, messages: action.messages}
        }
        case 'FETCHING_MESSAGES': {
            return {...state, fetchingMessage: true}
        }
        case 'FETCHING_MESSAGES_SUCCESS': {
            return {...state, fetchingMessage: false, fetchingStatus: true}
        }
        case 'FETCHING_MESSAGES_FAILURE': {
            return {...state, fetchingMessage: false, fetchingStatus: false}
        }
        case 'SENDING_MESSAGES': {
            return {...state, sendingMessage: true}
        }
        case 'SENDING_MESSAGES_SUCCESS': {
            return {...state, sendingMessage: false, sendingStatus: true}
        }
        case 'SENDING_MESSAGES_FAILURE': {
            return {...state, sendingMessage: false, sendingStatus: false}
        }
        case 'ADD_MESSAGE': {
            const { messages } = state;
            messages.push(action.message);

            return {...state, messages}
        }

        case 'CLEAR_MESSAGES': {
            return initialState;
        }
        default:
            return state;
    }
};

export default chat;
