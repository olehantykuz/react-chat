import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

import ChatMessages from './ChatMessages';
import ChatMessagesForm from './ChatMessagesForm';
import SearchNewContacts from './SearchNewContacts';
import PendingContacts from './PendingContacts';
import Friends from './Friends';
import { addFriendRequest, addToFriendsFromRequested } from '../../actions/contacts';
import { fetchChatMessages, addMessageToRoom } from '../../actions/chats';

function Chat(props) {
    const { broadcastChannelPrefix } = props.config;
    const hasConfigs = broadcastChannelPrefix !== undefined;

    useEffect(() => {
        const {active: roomId} = props.chats;

        if (roomId && props.chats[roomId].messages.length === 0) {
            props.fetchChatMessages(roomId);
        }
    }, [props.chats.active]);

    useEffect(() => {
        let addFriendChannelName = '';
        let confirmedFriendChannelName = '';

        if (hasConfigs && props.auth.id) {
            addFriendChannelName = broadcastChannelPrefix + 'private-request.friend.to.' + props.auth.id;
            confirmedFriendChannelName =broadcastChannelPrefix + 'private-confirm.friend.to.' + props.auth.id;

            Echo.channel(addFriendChannelName)
                .listen('.request.friend', e => {
                    props.addFriendRequest(e.sender);
                });
            Echo.channel(confirmedFriendChannelName)
                .listen('.confirm.friend', e => {
                    props.addToFriendsFromRequested(e.sender, e.room);
                });
        }

        return () => {
            confirmedFriendChannelName && Echo.leave(confirmedFriendChannelName);
            addFriendChannelName && Echo.leave(addFriendChannelName);
        }

    }, [props.config, props.auth.id]);

    useEffect(() => {
        const roomsChannelsNames = [];
        if (hasConfigs && props.auth.id) {
            Object.keys(props.rooms).forEach(room => {
                const cnName = broadcastChannelPrefix + 'private-message.to.room.' + room;
                roomsChannelsNames.push(cnName);

                Echo.channel(cnName)
                    .listen('.message.send', e => {
                        const { message, room} = e;
                        if (message.user_id !== props.auth.id) {
                            props.addMessageToRoom(message, room.id);
                        }
                    });
            });
        }

        return () => {
            roomsChannelsNames.forEach(name => {
                Echo.leave(name);
            });
        }
    }, [props.rooms, props.auth.id]);

    const getChatName = () => {
        const selectedRoomId = props.chats.active;

        if (selectedRoomId) {
            const room = props.rooms[selectedRoomId];
            let chatName = room.name;

            if (!chatName) {
                const { authUserId } = props.auth;
                const userId = room.users.find(id => {
                    return id !== authUserId;
                });
                chatName = `Chat with ${props.users[userId].name}`
            }

            return chatName;
        }

        return 'No selected Chat';
    };

    const { pending, requests } = props.contacts;

    return (
        <div className="row justify-content-center">
            <div className="col-md-3">
                <div className="card w-100 app_card">
                    <div className="card-body app_card--body">
                        <Friends />
                    </div>
                </div>
                {/*<div className="card w-100 app_card">*/}
                {/*    <div className="card-body app_card--body">*/}
                {/*        <h5>Groups</h5>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="col-md-6">
                <div className="card w-100">
                    <div className="card-body">
                        <div className="panel panel-default">
                            <div className="panel-heading">{getChatName()}</div>
                            {!!props.chats.active && <Fragment>
                                <div className="panel-body">
                                    <ScrollToBottom className={'stb'}>
                                        <ChatMessages />
                                    </ScrollToBottom>
                                </div>
                                <div className="panel-footer">
                                    <ChatMessagesForm />
                                </div>
                            </Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card w-100 app_card">
                    <div className="card-body">
                        <SearchNewContacts />
                    </div>
                </div>
                {(pending.length > 0 || requests.length > 0) &&
                    <div className="card w-100 app_card">
                        <div className="card-body app_card--body">
                            <PendingContacts />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    users: state.users,
    messages: state.messages,
    auth: state.auth,
    config: state.config,
    rooms: state.rooms,
    chats: state.chats,
    contacts: state.contacts,
});
const mapDispatchToProps = dispatch => ({
    fetchChatMessages: roomId => dispatch(fetchChatMessages(roomId)),
    addMessageToRoom: (payload, roomId) => dispatch(addMessageToRoom(payload, roomId)),
    addFriendRequest: payload => dispatch(addFriendRequest(payload)),
    addToFriendsFromRequested: (user, room) => dispatch(addToFriendsFromRequested(user, room)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
