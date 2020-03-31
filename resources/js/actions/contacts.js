import { normalize } from 'normalizr';
import { userSchema } from '../schemas';

import { contactsService } from '../services/contacts';
import { setUser } from './users';

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

export const clearContacts = () => ({
    type: CLEAR_CONTACTS
});
const setPendingContacts = ids => ({
    type: SET_PENDING_CONTACTS,
    ids
});
const addContactToPending = id => ({
    type: ADD_PENDING_CONTACT,
    id
});
const removeContactFromPending = id => ({
    type: REMOVE_PENDING_CONTACT,
    id
});

const setFriendsContacts = ids => ({
    type: SET_FRIENDS,
    ids
});
const addContactToFriends = id => ({
    type: ADD_FRIEND,
    id
});
const removeContactFromFriends = id => ({
    type: REMOVE_FRIEND,
    id
});

const setRequestsContacts = ids => ({
    type: SET_REQUESTS_CONTACTS,
    ids
});
const addContactToRequests = id => ({
    type: ADD_CONTACT_TO_REQUESTS,
    id
});
const removeContactFromRequests = id => ({
    type: REMOVE_CONTACT_FROM_REQUESTS,
    id
});

const requestingNewFriend = () => ({
    type: REQUESTING_NEW_FRIEND
});
const requestingNewFriendSuccess = () => ({
    type: REQUESTING_NEW_FRIEND_SUCCESS
});
const requestingNewFriendFailure = () => ({
    type: REQUESTING_NEW_FRIEND_FAILURE
});
const confirmingNewFriend = () => ({
    type: CONFIRMING_NEW_FRIEND
});
const confirmingNewFriendSuccess = () => ({
    type: CONFIRMING_NEW_FRIEND_SUCCESS
});
const confirmingNewFriendFailure = () => ({
    type: CONFIRMING_NEW_FRIEND_FAILURE
});

export const sendFriendRequest = id => {
    return dispatch => {
        dispatch(requestingNewFriend());
        contactsService.requestToFriend(id).then(
            response => {
                const normalizedUser = normalize(response.data.recipient, userSchema);
                const id = normalizedUser.result;
                const user = normalizedUser.entities.users[id];
                dispatch(setUser(id, user));
                dispatch(addContactToPending(id));
                dispatch(requestingNewFriendSuccess());
            },
            error => {
                dispatch(requestingNewFriendFailure());
            }
        )
    }
};

export const addFriendRequest = sender => {
    return dispatch => {
        const normalizedUser = normalize(sender, userSchema);
        const id = normalizedUser.result;
        const user = normalizedUser.entities.users[id];
        dispatch(setUser(id, user));
        dispatch(addContactToRequests(id));
    }
};
