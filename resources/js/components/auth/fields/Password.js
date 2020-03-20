import React from 'react';

function Password(props) {
    const key = props.confirm ? 'passwordConfirmation' : 'password';

    const validatePassword = value => {
        if (value.length < 8) {
            props.setErrors(key, 'Password must be 8 characters long!');
        } else {
            props.setErrors(key, '');
        }
    };

    const handleBlur = () => {
        props.handleTouch(key);
        validatePassword(props.value);
    };

    const handleChange = e => {
        props.changeHandler(e);
        if (props.touched) {
            validatePassword(e.target.value);
        }
    };

    const error = props.confirm ? props.errors.passwordConfirmation : props.errors.password;

    return (
        <div className="form-group row">
            <label htmlFor={props.confirm ? "password-confirm" : "password"} className="col-md-4 col-form-label text-md-right">
                {props.confirm ? 'Confirm Password' : 'Password'}
            </label>
            <div className="col-md-6">
                <input
                    id={props.confirm ? "password-confirm" : "password"}
                    type="password"
                    className={`form-control ${error ? 'is-invalid' : '' }`}
                    value={props.value}
                    name={props.confirm ? "password-confirm" : "password"}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    onBlur={handleBlur}
                />

                {error && (
                    <span className="invalid-feedback" role="alert">
                        <strong>{error}</strong>
                    </span>
                )}
            </div>
        </div>
    );
}

export default Password;
