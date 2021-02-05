import React, { Component } from 'react';
import axios from 'axios';
import '../CreateTest.css'
import createMyTest from '../images/Create_My_Test.png';

class CreateTest extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        }
    }
    handleFileInput(e) {
        this.setState({
            selectedFile: e.target.files[0],
        })
    }

    handlePost() {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
    
        return axios.post("/api/upload", formData).then(res => {
          this.props.onChangePageCreateDone()

        }).catch(err => {
          alert('파일을 다시 입력해주세요')
          this.props.onChangePageCreateDone()
        })
      }

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
                        <input type="file" name="input-file" accept=".gif, .jpg, .png" 
                        id="input-file" style={{ display: "none" }} 
                        onChange={e => this.handleFileInput(e)}/>
                    </div>
                </div>
                <div className="create-btns">
                    <div className="btn-create-test">
                    <a href="#/submit" className="btn-create-test-font"
                        onClick={function (e) {
                            this.handlePost();
                        }.bind(this)}>
                            <p className="btn-create-test-font">제출하기</p>
                        </a>
                    </div>
                    <div className="btn-create-test-cancle">
                    <a href="./" className="btn-create-test-cancle-font"
                        onClick={function (e) {
                                                    
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