import React, { Component } from 'react';

class Message extends Component {

    render() {
        const visibleTime = 4000, disappearing = 1000
        function createMessage(message) {
            const messageId = createMessageID()

            dispatch({
                type: MESSAGE_LIFECYCLE.WILL_APPEAR,
                result: { messageId, message }
            })
            setTimeout(() => {
                dispatch({
                    type: MESSAGE_LIFECYCLE.DID_APPEAR,
                    result: { messageId }
                })
            }, 100)
            setTimeout(() => {
                dispatch({
                    type: MESSAGE_LIFECYCLE.WILL_DISAPPEAR,
                    result: { messageId }
                })
            }, visibleTime)
            setTimeout(() => {
                dispatch({
                    type: MESSAGE_LIFECYCLE.DID_DISAPPEAR,
                    result: { messageId }
                })
            }, visibleTime + disappearing)
        }
        createMessage(this.props.message);
    }
}

export default Message;