import {CLEAR_SERVER_ERRORS, SET_SERVER_ERRORS, CLEAR_ALL_ERRORS} from '../actionTypes/errors';
import { processServerErrors } from '../helpers';

export const setServerErrors = (field, value) => ({
    type: SET_SERVER_ERRORS,
    field,
    value
});
export const clearServerErrors = field => ({
    type: CLEAR_SERVER_ERRORS,
    field
});
export const clearAllErrors = () => ({
    type: CLEAR_ALL_ERRORS
});

export const setErrors = (field, errors) => {
    return dispatch => {
        const processedErrors = processServerErrors(errors);
        dispatch(setServerErrors(field, processedErrors));
    }
};
