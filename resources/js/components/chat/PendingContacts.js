import React, {Fragment} from 'react';
import {connect} from 'react-redux';

function PendingContacts(props) {
    const { pending, requests } = props.contacts;

    return (
        <Fragment>
            <h5 className="text-center">Possible Contacts</h5>
            {pending.length > 0 &&
            <div className="requested_contacts">
                <h6 className="text-center">Requests</h6>
                {props.contacts.pending.map((id, index) => {
                    const user = props.users[id];

                    return user !== undefined ? (
                        <div key={id} className="requested_contacts--item">
                            <span>{index + 1}. {props.users[id].name}</span>
                        </div>
                    ) : null;
                })}
            </div>
            }
            {requests.length > 0 &&
            <div className="invitation_contacts">
                <h6 className="text-center">Invitation</h6>
                {props.contacts.requests.map((id, index) => {
                    const user = props.users[id];

                    return user !== undefined ? (
                        <div key={id} className="invitation_contacts--item">
                            <span>{index + 1}. {props.users[id].name}</span>
                            <button className="btn btn-success">
                                Add
                            </button>
                        </div>
                    ) : null;
                })}
            </div>
            }
        </Fragment>
    );
}

const mapStateToProps = state => ({
    users: state.users,
    contacts: state.contacts
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PendingContacts);
