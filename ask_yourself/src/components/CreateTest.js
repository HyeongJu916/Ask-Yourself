import React, { Component } from 'react';
import '../CreateTest.css'
import createMyTest from '../images/Create_My_Test.png';

class CreateTest extends Component{
    render() {
        return (
            <div className="test-create">
                <div className="create-test-title">
                    <h1 className="create-test-title-font">새로운 테스트 만들기</h1></div>
                <div className="file-input">
                    <div>
                        <label className="input-file-button" for="input-file">
                            테스트 생성을 위한 학습자료를 업로드 하세요 <br /> (.gif, .jpg, .png) <br/><br/>
                             <img src={createMyTest} width='100' height='100'/>
                        </label>
                        <input type="file" accept=".gif, .jpg, .png" id="input-file" style={{ display: "none" }} />
                    </div>
                </div>
                <div className="create-btns">
                    <div className="btn-create-test">
                    <a href="#/submit" className="btn-create-test-font"
                        onClick={function (e) {
                            // 서버에 전달
                            this.props.onChangePageCreateDone();
                        }.bind(this)}>
                            <p className="btn-create-test-font">제출하기</p>
                        </a>
                    </div>
                    <div className="btn-create-test-cancle">
                    <a href="./" className="btn-create-test-cancle-font"
                        onClick={function (e) {
                            alert("생성 중인 테스트를 정말 삭제하시겠습니까?");
                        }}>
                        나가기
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTest;