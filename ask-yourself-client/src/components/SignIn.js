import React from 'react';
import { post } from 'axios';
import login_thum from '../images/Login_thumbnail.png';
import logo from '../images/Logo.png';
import '../SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            password : ''
        };
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    Login() {
        const url = '/api/session';
        const formData = new FormData();
        formData.append('id', this.state.id)
        formData.append('pw', this.state.pw)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.Login()
        .then((response) => {
            console.log(response.data);
        })
        //this.props.history.push("/");
    }

    render() {
        return (
            <div style={{display:"flex", width:"1000px", height:"1000px"}}>
                <img src={login_thum} style={{height:"1200px"}}/>
                <div className="frame">
                    <p>로그인</p>
                    <form onSubmit={this.handleFormSubmit}>
                        <input type="text" placeholder="아이디" name="id" value={this.state.id} onChange={this.handleValueChange} /> <br />
                <input type="password" placeholder="비밀번호" name="pw" value={this.state.pw} onChange={this.handleValueChange} /> <br />
                        <button type="submit" onClick="./"> <a href ="./"class="font-color">로그인</a> </button>
                        {/* <button>회원가입</button> */}
                        <br/>
                        <img src={logo} style={{width:"200px"}}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;