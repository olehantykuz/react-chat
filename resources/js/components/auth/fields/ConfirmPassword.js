import React from 'react';
import PropTypes from 'prop-types';

import Password from './Password';

function ConfirmPassword(props) {
    return (
        <Password
            value={props.value}
            errors={props.errors}
            changeHandler={props.changeHandler}
            setErrors={props.setErrors}
            touched={props.touched}
            handleTouch={props.handleTouch}
            confirm
        />
    )
}

export default ConfirmPassword;

ConfirmPassword.propTypes = {
    value: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
    handleTouch: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired
};
