import {SET_ROOMS, CLEAR_ROOMS, REMOVE_ROOM, ADD_ROOMS, ADD_ROOM} from '../actionTypes/rooms';

export const setRooms = items => ({
    type: SET_ROOMS,
    items
});
export const addRooms = items => ({
    type: ADD_ROOMS,
    items
});
export const addRoom = (id, data) => ({
    type: ADD_ROOM,
    id,
    data
});
export const removeRoom = id => ({
    type: REMOVE_ROOM,
    id
});
export const clearRooms = () => ({
    type: CLEAR_ROOMS
});
