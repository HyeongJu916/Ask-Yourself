import React, { Component } from 'react';
import PopupContainer from './PopupContainer';


class Popup extends Component {
    render() {
        return (
            <PopupContainer >
                <Alert key={POPUP.ALERT} />
                <Confirm key={POPUP.CONFIRM} />
                <PostEditPopup key={POPUP.POST_EDIT} />
            </PopupContainer>
        )
    }
}

export default Popup;