import React, { Fragment, useState, useEffect } from 'react';
import { contactsService } from '../../services/contacts';

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
            handler && clearTimeout(handler);
        };
    }, [query]);

    const handleQueryChange = e => {
        setQuery(e.target.value);
    };

    return (
        <Fragment>
            <h5 className="text-center">Find user</h5>
            <div className="form-group row">
                <div className="col-sm-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name or email"
                        value={query}
                        onChange={handleQueryChange}
                    />
                </div>
            </div>
            <div className="new_contacts">
                {contacts.length > 0 && (
                    contacts.map(contact => {
                        return (
                            <div key={contact.id} className="new_contacts--item">
                                <button className="btn btn-outline-success">+</button>
                                <span>{contact.name} ({contact.email})</span>
                            </div>
                        );
                    })
                )}
            </div>
        </Fragment>
    );
}

export default SearchNewContacts;
