import { combineReducers } from 'redux';

import user from './user';
import auth from './auth';
import chat from './chat';

export default combineReducers({
    user,
    auth,
    chat,
});
