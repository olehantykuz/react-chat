import React from 'react';

import Header from '../components/common/Header';
import ChatMessages from '../components/chat/ChatMessages';
import ChatMessagesForm from '../components/chat/ChatMessagesForm';

function MainPage() {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">Chats</div>

                            <div className="panel-body">
                                <ChatMessages />
                            </div>
                            <div className="panel-footer">
                                <ChatMessagesForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
