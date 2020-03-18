import React from 'react';

function Email(props) {
    const key = 'email';

    const validEmailRegex =
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const validateEmail = value => {
        if (!value || !validEmailRegex.test(value)) {
            props.setErrors(key, 'Invalid email');
        } else {
            props.setErrors(key, '');
        }
    };

    const handleBlur = () => {
        props.handleTouch(key);
        validateEmail(props.value);
    };

    const handleChange = e => {
        props.changeHandler(e);
        if (props.touched) {
            validateEmail(e.target.value);
        }
    };

    return (
        <div className="form-group row">
            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

            <div className="col-md-6">
                <input
                    id="email"
                    type="email"
                    className={`form-control ${props.errors.email ? 'is-invalid' : '' }`}
                    name="email"
                    value={props.value}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    autoFocus
                    onBlur={handleBlur}
                />

                {props.errors.email && (
                    <span className="invalid-feedback" role="alert">
                        <strong>{props.errors.email}</strong>
                    </span>
                )}
            </div>
        </div>
    );
}

export default Email;
