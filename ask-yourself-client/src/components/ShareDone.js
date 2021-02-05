import React from 'react';
import '../Modal.css';
import closebtn from '../images/Close_Btn.png'

const Modal = ({ isOpen, close }) => {

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
                            <p className="title">테스트가 그룹에 성공적으로 <br/> 공유되었습니다! </p>
                            <div className="content">
                                <ul>
                                
                                </ul>
                            </div>
                            <div className="btns" style={{display: "flex"}}>
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