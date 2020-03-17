import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { isLoggedIn } from '../../helpers';
import { userService } from '../../services/auth';

function Header(props) {
    const logoutHandle = e => {
        e.preventDefault();

        userService.logout().then(response => {
            props.history.push('/');
        })
    };


    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Online Chat
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {!isLoggedIn() && ( <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </Fragment>)}

                        {isLoggedIn() && ( <Fragment>
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Username <span className="caret"></span>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item"
                                       onClick={logoutHandle}>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </Fragment>)}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Header);
