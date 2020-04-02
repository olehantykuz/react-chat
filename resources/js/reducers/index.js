import { combineReducers } from 'redux';

import errors from './errors';
import auth from './auth';
import chat from './chat';
import config from './config';
import users from './users';
import messages from './messages';
import contacts from './contacts';

export default combineReducers({
    config,
    users,
    auth,
    chat,
    messages,
    contacts,
    errors,
});
