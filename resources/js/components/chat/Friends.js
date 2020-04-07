import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {toggleChat} from '../../actions/chats';

function Friends(props) {
    const handleClick = id => {
        if (id) {
            props.toggleChat(id);
        }
    };

    const getRoomIdByFriendId = friendId => {
        let result = null;
        Object.values(props.rooms).forEach(room => {
            if (room.users.indexOf(friendId) > -1) {
                result = room.id;
            }
        });

        return result;
    };

    return (
        <Fragment>
            <h5 className="text-center">Friends</h5>
            {props.contacts.friends.length > 0 &&
            <div className="friends_contacts">
                {props.contacts.friends.map((id, index) => {
                    const user = props.users[id];
                    const roomId = getRoomIdByFriendId(id);
                    const cssClasses = `friends_contacts--item ${roomId === props.chats.active ? 'active' : ''}`;

                    return user !== undefined ? (
                        <div
                            key={id}
                            className={cssClasses}
                            onClick={() => handleClick(roomId)}
                        >
                            <span>{props.users[id].name} - {props.users[id].email}</span>
                        </div>
                    ) : null;
                })}
            </div>
            }
        </Fragment>
    );
}

const mapStateToProps = state => ({
    contacts: state.contacts,
    users: state.users,
    rooms: state.rooms,
    chats: state.chats,
});
const mapDispatchToProps = dispatch => ({
    toggleChat: id => dispatch(toggleChat(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
