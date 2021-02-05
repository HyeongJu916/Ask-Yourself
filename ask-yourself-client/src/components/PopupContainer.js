import React, { Component } from 'react';


class PopupContainer extends Component {
    // PopupContainer.js
    getVisiblePopups() {
        const allPopups = Immutable.List(this.props.children)
        return this.props.openedPopups // injected from Store, instance of Immutable.OrderedMap
            .map((_, key) => allPopups.find(popup => popup.key === key))
            .toList()
    }
    componentDidMount() {
        document.body.addEventListener("keydown", this.closeLastPopup)
    }

    closeLastPopup = e => {
        if (!(e.key == "Escape" || e.keyCode == 27)) return

        const lastPopup = this.getVisiblePopups().last()
        this.closeIfEscapable(lastPopup)(e)
    }
    
    closeIfEscapable = popup => e => {
        if (popup && popup.props.escapable) {
            this.props.actions.closePopup(popup.key)
        }
    }

    render() {
        const popups = this.getVisiblePopups()
            .map(Element => {
                const popupKey = Element.key
                const popupParams = this.props.openedPopups.get(popupKey)
                return React.cloneElement(Element, {
                    close: this.closePopup(popupKey),
                    ...popupParams
                })
            })

        if (popups.size === 0) return null

        return (
            <div id="popup-container">
                {popups.map(popup => (
                    <div key={popup.key} className="popup-background">
                        {popup}
                    </div>
                ))}
            </div>
        )
    }
}

export default PopupContainer;