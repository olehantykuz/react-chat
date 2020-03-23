import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ChatMessagesItem from './ChatMessagesItem';
import { addMessage, fetchMessages } from '../../actions/chat';
import { isLoggedIn } from '../../helpers';

function ChatMessages (props) {
    useEffect(() => {
        Echo.private('chat')
            .listen('.message.send', e => {
                const { message } = e;
                props.addMessage(message);
            });
        if (isLoggedIn()) {
            props.fetchMessages();
        }
    }, []);

    return (
        <ul className="chat">
            {props.chat.messages.map(message => {
                return (
                    <ChatMessagesItem
                        message={message}
                        key={message.id}
                    />
                );
            })}
        </ul>
    );
}

const mapStateToProps = state => ({
    chat: state.chat,
});
const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessages()),
    addMessage: payload => dispatch(addMessage(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
