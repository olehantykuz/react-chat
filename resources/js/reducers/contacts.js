import {
    CLEAR_CONTACTS,
    SET_PENDING_CONTACTS,
    ADD_PENDING_CONTACT,
    REMOVE_PENDING_CONTACT,
    SET_FRIENDS,
    ADD_FRIEND,
    REMOVE_FRIEND,
    REQUESTING_NEW_FRIEND,
    REQUESTING_NEW_FRIEND_SUCCESS,
    REQUESTING_NEW_FRIEND_FAILURE,
    CONFIRMING_NEW_FRIEND,
    CONFIRMING_NEW_FRIEND_SUCCESS,
    CONFIRMING_NEW_FRIEND_FAILURE,
    SET_REQUESTS_CONTACTS,
    ADD_CONTACT_TO_REQUESTS,
    REMOVE_CONTACT_FROM_REQUESTS
} from '../actionTypes/contacts';

const initialState = {
    pending: [],
    friends: [],
    requests: [],
    isRequestedNewFriend: false,
    requestedNewFriendStatus: null,
    isConfirmingNewFriend: false,
    confirmedNewFriendStatus: null
};

const contacts = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_CONTACTS:
            return initialState;
        case SET_PENDING_CONTACTS:
            return {...state, pending: action.ids};
        case ADD_PENDING_CONTACT: {
            const { pending } = state;
            pending.push(action.id);

            return {...state, pending}
        }
        case REMOVE_PENDING_CONTACT: {
            const pending = state.pending.filter(id => id !== action.id);

            return {...state, pending }
        }
        case SET_FRIENDS:
            return {...state, friends: action.ids};
        case ADD_FRIEND: {
            const { friends } = state;
            friends.push(action.id);

            return {...state, friends}
        }
        case REMOVE_FRIEND: {
            const friends = state.friends.filter(id => id !== action.id);

            return {...state, friends }
        }
        case SET_REQUESTS_CONTACTS:
            return {...state, requests: action.ids};
        case ADD_CONTACT_TO_REQUESTS: {
            const { requests } = state;
            requests.push(action.id);

            return {...state, requests}
        }
        case REMOVE_CONTACT_FROM_REQUESTS: {
            const requests = state.requests.filter(id => id !== action.id);

            return {...state, requests }
        }
        case REQUESTING_NEW_FRIEND:
            return {...state, isRequestedNewFriend: true};
        case REQUESTING_NEW_FRIEND_SUCCESS:
            return {...state, isRequestedNewFriend: false, requestedNewFriendStatus: true};
        case REQUESTING_NEW_FRIEND_FAILURE:
            return {...state, isRequestedNewFriend: false, requestedNewFriendStatus: false};
        case CONFIRMING_NEW_FRIEND:
            return {...state, isConfirmingNewFriend: true};
        case CONFIRMING_NEW_FRIEND_SUCCESS:
            return {...state, isConfirmingNewFriend: false, confirmedNewFriendStatus: true};
        case CONFIRMING_NEW_FRIEND_FAILURE:
            return {...state, isConfirmingNewFriend: false, confirmedNewFriendStatus: false};
        default:
            return state;
    }
};

export default contacts;
