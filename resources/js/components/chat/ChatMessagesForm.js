import React, {useState} from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../helpers';
import { sendMessage } from '../../actions/chats';

function ChatMessagesForm(props) {
    const [message, setMessage] = useState('');

    const handleOnChange = e => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            props.sendMessage(message, props.chats.active);
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
    chats: state.chats,
});
const mapDispatchToProps = dispatch => ({
    sendMessage: (text, roomId) => dispatch(sendMessage(text, roomId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessagesForm);
