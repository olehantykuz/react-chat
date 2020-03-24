import { combineReducers } from 'redux';

import user from './user';
import auth from './auth';
import chat from './chat';
import config from './config';

export default combineReducers({
    config,
    user,
    auth,
    chat,
});
