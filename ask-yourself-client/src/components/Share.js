import React from 'react';
import '../Modal.css';
import closebtn from '../images/Close_Btn.png';
import { Checkbox } from '@material-ui/core';

const Modal = ({ isOpen, close, glist }) => {

    let groups = [];
    let groupList = [{ gid: 1, title: "알고방", userCount: 5 },
    { gid: 3, title: "정처기방", userCount: 10 },
    { gid: 5, itle: "운체방", userCount: 7}]
    
    let i = 0;
    while (i < groupList.length) {
        groups.push(
            <li>
                <form>
                    <input type="checkbox"></input>
                </form>
                <p>{groupList[i].title}</p>
            </li>
        )
        i = i + 1
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
                                    {groups}
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