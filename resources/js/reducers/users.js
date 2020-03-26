import {CLEAR_USERS, REMOVE_USER, SET_USER} from '../actionTypes/users';

const users = (state = {}, action) => {
    switch (action.type) {
        case SET_USER: {
            const { id, data } = action;

            return {...state, [id]: data}
        }
        case REMOVE_USER: {
            return Object.keys(state)
                .filter(key => key === action.id)
                .reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: state[key]
                    };
                }, {});
        }
        case CLEAR_USERS:
            return {};
        default:
            return state;
    }
};

export default users;
