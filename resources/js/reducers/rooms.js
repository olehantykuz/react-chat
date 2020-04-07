import {ADD_ROOMS, ADD_ROOM, CLEAR_ROOMS, REMOVE_ROOM, SET_ROOMS} from '../actionTypes/rooms';

const rooms = (state = {}, action) => {
    switch (action.type) {
        case SET_ROOMS:
            return action.items;
        case ADD_ROOMS: {
            const entities = {...state};
            const { items } = action;
            Object.keys(items).forEach(id => {
                if (!entities.hasOwnProperty(id)) {
                    entities[id] = {...items[id]};
                }
            });

            return items;
        }
        case ADD_ROOM: {
            const { id, data } = action;

            return {...state, [id]: data}
        }
        case REMOVE_ROOM: {
            return Object.keys(state)
                .filter(key => key === action.id)
                .reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: state[key]
                    };
                }, {});
        }
        case CLEAR_ROOMS:
            return {};
        default:
            return state;
    }
};

export default rooms;
