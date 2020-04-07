import React from 'react';
import { connect } from 'react-redux';

import ChatMessagesItem from './ChatMessagesItem';

function ChatMessages (props) {
    const { active } = props.chats;
    const ids = active ? props.chats[active].messages : [];

    return (
        <ul className="chat">
            {ids.map(id => {
                const message = props.messages[id];
                const user = props.users[message.user];

                return (
                    <ChatMessagesItem
                        message={message}
                        user={user}
                        key={id}
                    />
                );
            }).reverse()}
        </ul>
    );
}

const mapStateToProps = state => ({
    users: state.users,
    messages: state.messages,
    chats: state.chats,
});

export default connect(mapStateToProps)(ChatMessages);
