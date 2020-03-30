import React, {Fragment} from 'react';
import PropTypes from 'prop-types'

function ServerErrors(props) {
    return (
        props.serverErrors ? (
                <Fragment>
                    {props.serverErrors.map((error, index) => {
                        return (
                                <div className="alert alert-danger mt-1"
                                    key={index + 1}
                                    role="alert"
                                >
                                    <strong>{error}</strong>
                                </div>
                        )
                    })}
                </Fragment>
            ) : null
    );
}

export default ServerErrors;

ServerErrors.propTypes = {
    serverErrors: PropTypes.arrayOf(PropTypes.string)
};
