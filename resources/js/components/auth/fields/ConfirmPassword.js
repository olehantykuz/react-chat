import React from 'react';

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
