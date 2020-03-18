import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { userService } from '../../services/auth';
import { hasError, processServerErrors } from '../../helpers';
import Email from './fields/Email';
import Password from './fields/Password';
import ServerErrors from './fields/ServerErrors';

function Login(props) {
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const updateError = (key, value) => {
        setErrors({...errors, [key]: value});
    };

    const touchField = field => {
        setTouched({ ...touched, [field]: true });
    };

    const isFormValid = !!(email && password && !hasError(errors));

    const loginHandle = e => {
        e.preventDefault();
        setServerErrors(null);

        if (isFormValid) {
            userService.login({
                email,
                password,
            }).then(response => {
                props.history.push('/');
            }).catch(err => {
                setServerErrors(processServerErrors(err.response.data.errors || [err.response.data.error]));
            });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>

                        <div className="card-body">
                            <form method="POST">
                                <Email
                                    value={email}
                                    errors={errors}
                                    changeHandler={onChangeEmail}
                                    setErrors={updateError}
                                    touched={touched.email}
                                    handleTouch={touchField}
                                />
                                <Password
                                    value={password}
                                    errors={errors}
                                    changeHandler={onChangePassword}
                                    setErrors={updateError}
                                    touched={touched.password}
                                    handleTouch={touchField}
                                />

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button
                                            className="btn btn-primary"
                                            onClick={loginHandle}
                                            disabled={!isFormValid}
                                        >Login
                                        </button>

                                        {/*<Link to="/forgot-password" className="btn btn-link">*/}
                                        {/*    Forgot Your Password?*/}
                                        {/*</Link>*/}
                                    </div>
                                </div>
                                <ServerErrors
                                    serverErrors={serverErrors}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
