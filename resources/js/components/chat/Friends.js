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

                    return user !== undefined ? (
                        <div
                            key={id}
                            className="friends_contacts--item"
                            onClick={() => handleClick(roomId)}
                        >
                            <span>{index + 1}. {props.users[id].name}</span>
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
});
const mapDispatchToProps = dispatch => ({
    toggleChat: id => dispatch(toggleChat(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
