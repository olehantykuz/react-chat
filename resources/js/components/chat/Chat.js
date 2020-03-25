import React from 'react';
import ChatMessages from './ChatMessages';
import ChatMessagesForm from './ChatMessagesForm';

function Chat(props) {
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card w-100">
                    <div className="card-body">
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
            <div className="col-md-3">
                <div className="card w-100">
                    <div className="card-body">
                        <h5>Search</h5>
                    </div>
                </div>
                <div className="card w-100">
                    <div className="card-body">
                        <h5>Friends</h5>
                    </div>
                </div>
                <div className="card w-100">
                    <div className="card-body">
                        <h5>Groups</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
