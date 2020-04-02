import React from 'react';
import { connect } from 'react-redux';

import ChatMessagesItem from './ChatMessagesItem';

function ChatMessages (props) {
    return (
        <ul className="chat">
            {props.chat.messages.map(id => {
                const message = props.messages[id];
                const user = props.users[message.user];

                return (
                    <ChatMessagesItem
                        message={message}
                        user={user}
                        key={id}
                    />
                );
            })}
        </ul>
    );
}

const mapStateToProps = state => ({
    chat: state.chat,
    users: state.users,
    messages: state.messages
});

export default connect(mapStateToProps)(ChatMessages);
