import React from 'react';
import ChatMessages from './ChatMessages';
import ChatMessagesForm from './ChatMessagesForm';

function Chat(props) {
    return (
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
    );
}

export default Chat;
