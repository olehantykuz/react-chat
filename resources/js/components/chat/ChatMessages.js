import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ChatMessagesItem from './ChatMessagesItem';
import { fetchMessages } from '../../actions/chat';
import { isLoggedIn } from '../../helpers';

function ChatMessages (props) {
    useEffect(() => {
        if (isLoggedIn() && props.chat.messages.length === 0) {
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
    fetchMessages: () => dispatch(fetchMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
