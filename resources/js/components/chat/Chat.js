import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import ChatMessages from './ChatMessages';
import ChatMessagesForm from './ChatMessagesForm';
import SearchNewContacts from './SearchNewContacts';
import { isLoggedIn } from '../../helpers';
import { addNewChatMessage, fetchMessages } from '../../actions/chat';
import { addFriendRequest } from '../../actions/contacts';

function Chat(props) {
    useEffect(() => {
        const hasConfigs = props.config.broadcastChannelPrefix !== undefined;
        let chatChannelName = '';
        let adFriendChannelName = '';

        if (hasConfigs && props.auth.id) {
            chatChannelName = props.config.broadcastChannelPrefix + 'private-chat';
            adFriendChannelName = props.config.broadcastChannelPrefix + 'private-request.friend.to.' + props.auth.id;
            Echo.channel(chatChannelName)
                .listen('.message.send', e => {
                    const { message } = e;

                    //TODO: Fix self listening for redis driver
                    if (message.user.id !== props.auth.id) {
                        props.addNewChatMessage(message);
                    }
                });
            Echo.channel(adFriendChannelName)
                .listen('.request.friend', e => {
                    props.addFriendRequest(e.sender);
                });
        }

        if (isLoggedIn() && props.chat.messages.length === 0 && !props.chat.fetchingMessage) {
            props.fetchMessages();
        }

        return () => {
            chatChannelName && Echo.leave(chatChannelName);
            adFriendChannelName && Echo.leave(adFriendChannelName);
        }

    }, [props.config, props.auth.id]);


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
                        <SearchNewContacts />
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
    addFriendRequest: payload => dispatch(addFriendRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
