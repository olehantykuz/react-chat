const initialState = {
    fetchingUser: false,
    fetchingStatus: null,
    profile: {},
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {...state, profile: action.data};
        }
        case 'CLEAR_USER_DATA': {
            return {...state, profile: {}};
        }
        case 'FETCHING_USER': {
            return {...state, fetchingUser: true};
        }
        case 'FETCHING_USER_SUCCESS': {
            return {...state, fetchingUser: false, fetchingStatus: true};
        }
        case 'FETCHING_USER_FAILURE': {
            return {...state, fetchingUser: false, fetchingStatus: false};
        }
        default:
            return state;
    }
};

export default user;
