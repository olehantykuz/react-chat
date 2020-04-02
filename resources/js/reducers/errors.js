import {SET_SERVER_ERRORS, CLEAR_SERVER_ERRORS, CLEAR_ALL_ERRORS} from '../actionTypes/errors';

const initialState = {
    login: [],
    register: [],
    requestContact: [],
};

const errors = (state = initialState, action) => {
    switch (action.type) {
        case SET_SERVER_ERRORS: {
            const { field, value } = action;

            return {...state, [field]: value};
        }
        case CLEAR_SERVER_ERRORS: {
            const { field } = action;

            return {...state, [field]: [] }
        }
        case CLEAR_ALL_ERRORS:
            return initialState;
        default:
            return state;
    }
};

export default errors;
