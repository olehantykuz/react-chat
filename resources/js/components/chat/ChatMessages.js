import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ChatMessagesItem from './ChatMessagesItem';
import { addMessage, fetchMessages } from '../../actions/chat';
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
                    if (message.user.id !== props.user.profile.id) {
                        props.addMessage(message);
                    }
                });
        }

        if (isLoggedIn()) {
            props.fetchMessages();
        }

        return () => {
            hasConfigs && Echo.leave(channelName);
        }

    }, [props.config, props.user.profile]);

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
    user: state.user,
    config: state.config,
});
const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessages()),
    addMessage: payload => dispatch(addMessage(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
