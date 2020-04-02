import { SET_MESSAGE, REMOVE_MESSAGE, CLEAR_MESSAGES, ADD_MESSAGES } from '../actionTypes/messages';

const messages = (state = {}, action) => {
    switch (action.type) {
        case SET_MESSAGE: {
            const { id, data } = action;

            return {...state, [id]: data}
        }
        case ADD_MESSAGES: {
            const { items } = action;
            const entities = {...state};

            Object.keys(items).forEach(id => {
                if (!entities.hasOwnProperty(id)) {
                    entities[id] = {...items[id]};
                }
            });

            return entities;
        }
        case REMOVE_MESSAGE: {
            return Object.keys(state)
                .filter(key => key === action.id)
                .reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: state[key]
                    };
                }, {});
        }
        case CLEAR_MESSAGES:
            return {};
        default:
            return state;
    }
};

export default messages;
