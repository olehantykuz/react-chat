import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { userService } from '../../services/auth';

function Login(props) {
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const loginHandle = e => {
        e.preventDefault();

        userService.login({
            email,
            password,
        }).then(response => {
            props.history.push('/');
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>

                        <div className="card-body">
                            <form method="POST">
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control ${error.email ? 'is-invalid' : '' }`}
                                            name="email"
                                            value={email}
                                            onChange={onChangeEmail}
                                            required
                                            autoComplete="email"
                                            autoFocus
                                        />

                                        {error.email && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{message}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                    <div className="col-md-6">
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control ${error.password ? 'is-invalid' : '' }`}
                                            value={password}
                                            name="password"
                                            onChange={onChangePassword}
                                            required
                                            autoComplete="current-password"
                                        />

                                        {error.password && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{message}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button
                                            className="btn btn-primary"
                                            onClick={loginHandle}
                                        >Login
                                        </button>

                                        <Link to="/forgot-password" className="btn btn-link">
                                            Forgot Your Password?
                                        </Link>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
