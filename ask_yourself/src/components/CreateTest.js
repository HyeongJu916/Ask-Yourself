import React, { Component } from 'react';
import '../CreateTest.css'

class CreateTest extends Component{
    render() {
        return (
            <div className="test-create">
                <div className="title">
                    <h1>새로운 테스트 만들기</h1></div>
                <div className="file-input">
                    <div>
                        <label className="input-file-button" for="input-file">
                            테스트 생성을 위한 학습자료를 업로드해주세요 <br /> (.gif, .jpg, .png)
                            </label>
                        <input type="file" accept=".gif, .jpg, .png" id="input-file" style={{ display: "none" }} />
                    </div>
                </div>
                <div>
                    <a href=""
                        onClick={function (e) {

                            this.props.onChangePageMypage();
                        }.bind(this)}>
                        완료
                        </a>
                    <a href=""
                        onClick={function (e) {
                            alert("삭제하시겠습니까?");
                            this.props.onChangePageMypage();
                        }.bind(this)}>
                        삭제
                        </a>
                </div>
            </div>
        );
    }
}

export default CreateTest;