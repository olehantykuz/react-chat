import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ChatMessagesItem from './ChatMessagesItem';
import { addNewChatMessage, fetchMessages } from '../../actions/chat';
import { isLoggedIn } from '../../helpers';

function ChatMessages (props) {
    useEffect(() => {
        const hasConfigs = props.config.broadcastChannelPrefix !== undefined;
        const channelName = props.config.broadcastChannelPrefix + 'private-chat';
        if (hasConfigs) {
            Echo.channel(channelName)
                .listen('.message.send', e => {
                    const { message } = e;

                    //TODO: Fix self listening for redis driver
                    if (message.user.id !== props.auth.id) {
                        props.addNewChatMessage(message);
                    }
                });
        }

        if (isLoggedIn() && props.chat.messages.length === 0 && !props.chat.fetchingMessage) {
            props.fetchMessages();
        }

        return () => {
            hasConfigs && Echo.leave(channelName);
        }

    }, [props.config, props.auth.id]);

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
    messages: state.messages,
    auth: state.auth,
    config: state.config,
});
const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessages()),
    addNewChatMessage: payload => dispatch(addNewChatMessage(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
