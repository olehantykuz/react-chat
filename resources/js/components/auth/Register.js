import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { userService } from '../../services/auth';

function Register(props) {
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onChangePasswordConfirmation = e => {
        setPasswordConfirmation(e.target.value);
    };

    const registerHandle = e => {
        e.preventDefault();

        userService.register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }).then(response => {
            props.history.push('/login');
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <form method="POST">
                                <div className="form-group row">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                    <div className="col-md-6">
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${error.name ? 'is-invalid' : '' }`}
                                            name="name"
                                            value={name}
                                            onChange={onChangeName}
                                            required
                                            autoComplete="name"
                                            autoFocus
                                        />

                                        {error.name && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{message}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

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
                                            name="password"
                                            className={`form-control ${error.password ? 'is-invalid' : '' }`}
                                            value={password}
                                            onChange={onChangePassword}
                                            required autoComplete="new-password"
                                        />

                                        {error.password && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{message}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password-confirm"
                                           className="col-md-4 col-form-label text-md-right">
                                        Confirm Password
                                    </label>

                                    <div className="col-md-6">
                                        <input
                                            id="password-confirm"
                                            type="password"
                                            className="form-control"
                                            name="password_confirmation"
                                            value={passwordConfirmation}
                                            onChange={onChangePasswordConfirmation}
                                            required
                                            autoComplete="new-password"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button
                                            className="btn btn-primary"
                                            onClick={registerHandle}
                                        >
                                            Register
                                        </button>
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

export default withRouter(Register);
