import React from 'react';
import '../Modal.css';
import closebtn from '../images/Close_Btn.png';
import { Checkbox } from '@material-ui/core';

const Modal = ({ isOpen, close }) => {

    let groups = [];
    let groupList = this.props.groupList;
    let i = 0;
    while (i < groupList.length) {
        groups.push(
            <li key={groupList[i].id} className="test">
                <div class="mdc-form-field">
                    <div class="mdc-checkbox">
                        <input type="checkbox"
                            class="mdc-checkbox__native-control"
                            id="checkbox-1" />
                        <div class="mdc-checkbox__background">
                            <svg class="mdc-checkbox__checkmark"
                                viewBox="0 0 24 24">
                                <path class="mdc-checkbox__checkmark-path"
                                    fill="none"
                                    d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                            </svg>
                            <div class="mdc-checkbox__mixedmark"></div>
                        </div>
                        <div class="mdc-checkbox__ripple"></div>
                    </div>
                    <label for="checkbox-1">Checkbox 1</label>
                </div>
            </li>)
        i = i + 1;
    }

    return (
        <React.Fragment>
            {
                isOpen ?
                    <React.Fragment>
                        <div className="Modal-overlay" onClick={close} />
                        <div className="Modal">
                            <div className="button-wrap">
                                <a onClick={close} style={{ border: "0", outline: "0" }}><img src={closebtn}></img></a>
                            </div>
                            <p className="title">공유할 그룹을 선택해 주세요</p>
                            <div className="content">
                                <ul>
                                    
                                </ul>
                            </div>
                            <div className="btns" style={{ display: "flex" }}>
                                <div className="submitAnswer">
                                    <a className="submitLink" onClick={close} style={{ border: "0", outline: "0" }}>공유하기</a>
                                </div>
                                <div className="leavePage">
                                    <a className="leaveLink" onClick={close} style={{ border: "0", outline: "0" }}>취소</a>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    : null
            }
        </React.Fragment>
    )
}
export default Modal;