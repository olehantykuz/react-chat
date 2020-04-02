import {
    SET_CONFIG,
    CLEAR_CONFIG,
} from '../actionTypes/config';

const config = (state = {}, action) => {
    switch (action.type) {
        case SET_CONFIG: {
            return action.data
        }
        case CLEAR_CONFIG: {
            return {}
        }
        default:
            return state;
    }
};

export default config;
