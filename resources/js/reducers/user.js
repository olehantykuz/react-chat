const user = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return action.data;
        }
        case 'CLEAR_USER_DATA': {
            return {};
        }
        default:
            return state;
    }
};

export default user;
