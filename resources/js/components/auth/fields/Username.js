import React from 'react';
import PropTypes from 'prop-types';

function Username(props) {
    const key = 'name';

    const validateUsername = value => {
        if (!value) {
            props.setErrors(key, 'Field "Name" is mandatory');
        } else {
            props.setErrors(key, '');
        }
    };

    const handleBlur = () => {
        props.handleTouch(key);
        validateUsername(props.value);
    };

    const handleChange = e => {
        props.changeHandler(e);
        if (props.touched) {
            validateUsername(e.target.value);
        }
    };

    return (
        <div className="form-group row">
            <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

            <div className="col-md-6">
                <input
                    id="name"
                    type="text"
                    className={`form-control ${props.errors.name ? 'is-invalid' : '' }`}
                    name="name"
                    value={props.value}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    onBlur={handleBlur}
                />

                {props.errors.name && (
                    <span className="invalid-feedback" role="alert">
                        <strong>{props.errors.name}</strong>
                    </span>
                )}
            </div>
        </div>
    );
}

export default Username;

Username.propTypes = {
    value: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
    handleTouch: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired
};
