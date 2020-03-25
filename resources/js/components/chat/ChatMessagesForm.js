import React, {useState} from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions/chat';
import { isLoggedIn } from '../../helpers';

function ChatMessagesForm(props) {
    const [message, setMessage] = useState('');

    const handleOnChange = e => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            props.sendMessage(message);
            setMessage('');
        }
    };

    const handleOnClick = e => {
        e.preventDefault();
        sendMessage();
    };

    const handleKeyPress = e => {
        if(e.key === 'Enter'){
            sendMessage();
        }
    };

    return (
        <div className="input-group">
            <input
                id="btn-input"
                type="text"
                name="message"
                className="form-control input-sm"
                placeholder="Type your message here..."
                onChange={handleOnChange}
                onKeyPress={handleKeyPress}
                value={message}
            />

            <span className="input-group-btn">
                <button
                    className="btn btn-primary btn-sm"
                    id="btn-chat"
                    onClick={handleOnClick}
                    disabled={!isLoggedIn() || !message}
                >
                    Send
                </button>
            </span>
        </div>
    );
}

const mapStateToProps = state => ({
    chat: state.chat,
});
const mapDispatchToProps = dispatch => ({
    sendMessage: payload => dispatch(sendMessage(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessagesForm);
