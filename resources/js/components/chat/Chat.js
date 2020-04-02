import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import ChatMessages from './ChatMessages';
import ChatMessagesForm from './ChatMessagesForm';
import SearchNewContacts from './SearchNewContacts';
import PendingContacts from './PendingContacts';
import Friends from './Friends';
import { isLoggedIn } from '../../helpers';
import { addNewChatMessage, fetchMessages } from '../../actions/chat';
import { addFriendRequest, addToFriendsFromRequested } from '../../actions/contacts';

function Chat(props) {
    useEffect(() => {
        const { broadcastChannelPrefix } = props.config;
        const hasConfigs = broadcastChannelPrefix !== undefined;
        let chatChannelName = '';
        let addFriendChannelName = '';
        let confirmedFriendChannelName = '';

        if (hasConfigs && props.auth.id) {
            chatChannelName = broadcastChannelPrefix + 'private-chat';
            addFriendChannelName = broadcastChannelPrefix + 'private-request.friend.to.' + props.auth.id;
            confirmedFriendChannelName =broadcastChannelPrefix + 'private-confirm.friend.to.' + props.auth.id;

            Echo.channel(chatChannelName)
                .listen('.message.send', e => {
                    const { message } = e;

                    //TODO: Fix self listening for redis driver
                    if (message.user.id !== props.auth.id) {
                        props.addNewChatMessage(message);
                    }
                });
            Echo.channel(addFriendChannelName)
                .listen('.request.friend', e => {
                    props.addFriendRequest(e.sender);
                });
            Echo.channel(confirmedFriendChannelName)
                .listen('.confirm.friend', e => {
                    props.addToFriendsFromRequested(e.sender);
                });
        }

        if (isLoggedIn() && props.chat.messages.length === 0 && !props.chat.fetchingMessage) {
            props.fetchMessages();
        }

        return () => {
            chatChannelName && Echo.leave(chatChannelName);
            addFriendChannelName && Echo.leave(addFriendChannelName);
        }

    }, [props.config, props.auth.id]);

    return (
        <div className="row justify-content-center">
            <div className="col-md-3">
                <div className="card w-100">
                    <div className="card-body">
                        <Friends />
                    </div>
                </div>
                <div className="card w-100">
                    <div className="card-body">
                        <h5>Groups</h5>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
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
                        <PendingContacts />
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
    addToFriendsFromRequested: payload => dispatch(addToFriendsFromRequested(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
