import { combineReducers } from 'redux';

import auth from './auth';
import chat from './chat';
import config from './config';
import users from './users';

export default combineReducers({
    config,
    users,
    auth,
    chat,
});
