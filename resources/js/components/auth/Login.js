import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {clearRegisterStatus, clearServerErrors, login} from '../../actions/auth';

import { hasError } from '../../helpers';
import Email from './fields/Email';
import Password from './fields/Password';
import ServerErrors from './fields/ServerErrors';

function Login(props) {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    useEffect(() => {
        return function () {
            props.clearServerErrors('login');
            props.clearRegisterStatus();
        }
    }, []);

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
        if (isFormValid) {
            props.login({
                email,
                password,
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
                            {props.auth.registerStatus && (
                                <div className="alert alert-success mb-2" role="alert">
                                    <strong>Registration completed successfully</strong>
                                </div>
                            )}
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
                                    serverErrors={props.auth.errors.login}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    login: data => dispatch(login(data)),
    clearRegisterStatus: () => dispatch(clearRegisterStatus()),
    clearServerErrors: field => dispatch(clearServerErrors(field)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Login)
);
