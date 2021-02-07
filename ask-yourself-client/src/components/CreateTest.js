import React, { Component } from 'react';
import axios from 'axios';
import '../CreateTest.css'
import createMyTest from '../images/Create_My_Test.png';

class CreateTest extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            tid : null
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
        formData.append('testTitle', 'titlename')
        formData.append('uid', 1)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
          };
    
        return axios.post("http://ec2-15-164-49-176.ap-northeast-2.compute.amazonaws.com/tests/add-test/", formData, config).then(res => {
          console.log(res);
        }).catch(err => {
            console.log(err)
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
                        <a href="/home" className="btn-create-test-cancle-font">
                            <p className="btn-create-test-cancle-font">나가기</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTest;