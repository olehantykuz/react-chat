import React from 'react';

export default function ChatMessageItem(props) {
    return (
        <li className="left clearfix">
            <div className="chat-body clearfix">
                <div className="header">
                    <strong className="primary-font">
                        {props.user.name}
                    </strong>
                </div>
                <p>
                    {props.message.text}
                </p>
            </div>
        </li>
    );
}
