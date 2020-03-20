import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { hasError, processServerErrors } from '../../helpers';
import Username from './fields/Username';
import Email from './fields/Email';
import Password from './fields/Password';
import ConfirmPassword from './fields/ConfirmPassword';
import ServerErrors from './fields/ServerErrors';
import {clearServerErrors, register} from '../../actions/auth';

function Register(props) {
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        passwordConfirmation: false,
    });

    useEffect(() => {
        return function () {
            props.clearServerErrors('register');
        }
    }, []);

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

    const updateError = (key, value) => {
        setErrors({...errors, [key]: value});
    };

    const touchField = field => {
        setTouched({ ...touched, [field]: true });
    };

    const checkPasswords = () => {
        let result = true;
        if (!errors.password && !errors.passwordConfirmation && touched.password && touched.passwordConfirmation) {
            result = password === passwordConfirmation;
            if (!result) {
                updateError('passwordConfirmation', 'Password and password confirmation do not match');
            }
        }

        return result;
    };

    const isFormValid =
        !!(name && email && password && passwordConfirmation
            && !hasError(errors))
            && checkPasswords();

    const registerHandle = e => {
        e.preventDefault();

        if (isFormValid) {
            props.register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register</div>
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
                                <Username
                                    value={name}
                                    errors={errors}
                                    changeHandler={onChangeName}
                                    setErrors={updateError}
                                    touched={touched.name}
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

                                <ConfirmPassword
                                    value={passwordConfirmation}
                                    errors={errors}
                                    changeHandler={onChangePasswordConfirmation}
                                    setErrors={updateError}
                                    touched={touched.passwordConfirmation}
                                    handleTouch={touchField}
                                />

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button
                                            className="btn btn-primary"
                                            onClick={registerHandle}
                                            disabled={!isFormValid}
                                        >
                                            Register
                                        </button>
                                    </div>
                                </div>
                                <ServerErrors
                                    serverErrors={props.auth.errors.register}
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
    register: data => dispatch(register(data)),
    clearServerErrors: field => dispatch(clearServerErrors(field)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Register)
);
