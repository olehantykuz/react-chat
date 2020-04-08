import React from 'react';
import PropTypes from 'prop-types';

export default function ChatMessageItem(props) {
    const positionClassName = props.authId === props.message.user ? 'right' : 'left';

    return (
        <li className="left clearfix">
            <div className={`chat-body clearfix ${positionClassName}`}>
                <div className={`header ${positionClassName}`}>
                    <strong className="primary-font">
                        {props.user.name}
                    </strong>
                </div>
                <div className={`arrow_say ${positionClassName}`} />
                <p className={positionClassName}>
                    {props.message.text}
                </p>
            </div>
        </li>
    );
}

ChatMessageItem.propTypes = {
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
};
