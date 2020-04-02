import React from 'react';

import Header from '../components/common/Header';
import Chat from '../components/chat/Chat';
import Guest from '../components/common/Guest';

import { isLoggedIn } from '../helpers';

function MainPage() {
    return (
        <div>
            <Header />
            <div className="container">
                { isLoggedIn() ? <Chat /> : <Guest/>}
            </div>
        </div>
    );
}

export default MainPage;
