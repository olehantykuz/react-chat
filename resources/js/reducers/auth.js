const initialState = {
    errors: {
        login: [],
        register: [],
    },
    isRequestRegister: false,
    registerStatus: null,
    isRequestLogin: false,
    loggedIn: false,
    loginStatus: null,
};

const auth = (state=initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN': {
            return {...state, isRequestLogin: true}
        }
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                isRequestLogin: false,
                loggedIn: true,
                loginStatus: true
            }
        }
        case 'LOGIN_FAILURE': {
            return {
                ...state,
                isRequestLogin: false,
                loggedIn: false,
                loginStatus: false
            }
        }
        case 'CLEAR_LOGIN_STATUS': {
            return {...state, loginStatus: null}
        }
        case 'LOGOUT': {
            return initialState;
        }
        case 'REQUEST_REGISTER': {
            return {...state, isRequestRegister: true}
        }
        case 'REGISTER_SUCCESS': {
            return {
                ...state,
                isRequestRegister: false,
                registerStatus: true
            }
        }
        case 'REGISTER_FAILURE': {
            return {
                ...state,
                isRequestRegister: false,
                registerStatus: false
            }
        }
        case 'CLEAR_REGISTER_STATUS': {
            return {...state, registerStatus: null}
        }
        case 'SET_SERVER_ERRORS': {
            const { field, value } = action;
            const errors = Object.assign({}, {
                ...state.errors,
                [field]: value
            });

            return {...state, errors }
        }
        case 'CLEAR_SERVER_ERRORS': {
            const { field } = action;
            const errors = Object.assign({}, {
                ...state.errors,
                [field]: []
            });

            return {...state, errors }
        }
        default:
            return state;
    }
};

export default auth;
