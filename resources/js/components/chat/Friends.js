import React, {Fragment} from 'react';
import {connect} from 'react-redux';

function Friends(props) {
    return (
        <Fragment>
            <h5 className="text-center">Friends</h5>
            {props.friends.length > 0 &&
            <div className="friends_contacts">
                {props.friends.map((id, index) => {
                    const user = props.users[id];

                    return user !== undefined ? (
                        <div key={id} className="friends_contacts--item">
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
    friends: state.contacts.friends,
    users: state.users,
});

export default connect(mapStateToProps)(Friends);
