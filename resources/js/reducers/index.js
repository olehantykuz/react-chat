import { combineReducers } from 'redux';

import errors from './errors';
import auth from './auth';
import config from './config';
import users from './users';
import messages from './messages';
import contacts from './contacts';
import rooms from './rooms';
import chats from './chats';

export default combineReducers({
    config,
    users,
    auth,
    messages,
    contacts,
    rooms,
    chats,
    errors,
});
