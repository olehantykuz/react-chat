import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import ChatMessages from './ChatMessages';
import ChatMessagesForm from './ChatMessagesForm';
import SearchNewContacts from './SearchNewContacts';
import PendingContacts from './PendingContacts';
import Friends from './Friends';
import { addFriendRequest, addToFriendsFromRequested } from '../../actions/contacts';
import { fetchChatMessages, addMessageToRoom } from '../../actions/chats';

function Chat(props) {
    useEffect(() => {
        if (props.chats.active) {
            props.fetchChatMessages(props.chats.active);
        }
    }, [props.chats.active]);

    useEffect(() => {
        const { broadcastChannelPrefix } = props.config;
        const hasConfigs = broadcastChannelPrefix !== undefined;
        let chatChannelName = '';
        let addFriendChannelName = '';
        let confirmedFriendChannelName = '';
        const roomsChannelsNames = [];

        if (hasConfigs && props.auth.id) {
            chatChannelName = broadcastChannelPrefix + 'private-chat';
            addFriendChannelName = broadcastChannelPrefix + 'private-request.friend.to.' + props.auth.id;
            confirmedFriendChannelName =broadcastChannelPrefix + 'private-confirm.friend.to.' + props.auth.id;

            Echo.channel(addFriendChannelName)
                .listen('.request.friend', e => {
                    props.addFriendRequest(e.sender);
                });
            Echo.channel(confirmedFriendChannelName)
                .listen('.confirm.friend', e => {
                    props.addToFriendsFromRequested(e.sender);
                });

            Object.keys(props.rooms).forEach(room => {
                const cnName = broadcastChannelPrefix + 'private-message.to.room.' + room;
                roomsChannelsNames.push(cnName);

                Echo.channel(cnName)
                    .listen('.message.send', e => {
                        const { message, room} = e;
                        console.log({e, message, room, active: props.chats.active});
                        props.addMessageToRoom(message, room.id);
                    });
            });
        }

        return () => {
            chatChannelName && Echo.leave(chatChannelName);
            addFriendChannelName && Echo.leave(addFriendChannelName);
            roomsChannelsNames.forEach(name => {
                Echo.leave(name);
            });
        }

    }, [props.config, props.auth.id, props.rooms]);

    const selectedRoomId = props.chats.active;
    const chatName = selectedRoomId
        ? (props.rooms[selectedRoomId].name || 'Room ' + selectedRoomId)
        : 'No selected Chat';

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
                            <div className="panel-heading">{chatName}</div>

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
    users: state.users,
    messages: state.messages,
    auth: state.auth,
    config: state.config,
    rooms: state.rooms,
    chats: state.chats,
});
const mapDispatchToProps = dispatch => ({
    fetchChatMessages: roomId => dispatch(fetchChatMessages(roomId)),
    addMessageToRoom: (payload, roomId) => dispatch(addMessageToRoom(payload, roomId)),
    addFriendRequest: payload => dispatch(addFriendRequest(payload)),
    addToFriendsFromRequested: payload => dispatch(addToFriendsFromRequested(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
