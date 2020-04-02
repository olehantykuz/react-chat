import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { contactsService } from '../../services/contacts';
import { sendFriendRequest } from '../../actions/contacts';
import {clearServerErrors} from '../../actions/errors';
import ServerErrors from '../auth/fields/ServerErrors';

function SearchNewContacts(props) {
    const [query, setQuery] = useState('');
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        let handler = null;
        if (query) {
            handler = setTimeout(() => {
                contactsService.findNew(query).then(response => {
                    setContacts(response.data.data);
                })
            }, 500);
        }
        if (!query) {
            setContacts([]);
        }

        return () => {
            props.clearServerErrors('requestContact');
            handler && clearTimeout(handler);
        };
    }, [query]);

    const handleQueryChange = e => {
        setQuery(e.target.value);
    };

    const handleClick = (id) => {
        props.sendFriendRequest(id);
        setQuery('');
    };

    return (
        <Fragment>
            <h5 className="text-center">Find user</h5>
            <div className="form-group row search-contacts">
                <div className="col-sm-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name or email"
                        value={query}
                        onChange={handleQueryChange}
                    />
                </div>
                <ServerErrors
                    serverErrors={props.errors.requestContact}
                />
            </div>
            <div className="new_contacts">
                {contacts.length > 0 && (
                    contacts.map(contact => {
                        return (
                            <div key={contact.id} className="new_contacts--item">
                                <button
                                    className="btn btn-outline-success"
                                    onClick={() => {handleClick(contact.id)}}
                                >+</button>
                                <span>{contact.name} ({contact.email})</span>
                            </div>
                        );
                    })
                )}
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    config: state.config,
    contacts: state.contacts,
    errors: state.errors
});
const mapDispatchToProps = dispatch => ({
    sendFriendRequest: id => dispatch(sendFriendRequest(id)),
    clearServerErrors: field => dispatch(clearServerErrors(field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchNewContacts);
