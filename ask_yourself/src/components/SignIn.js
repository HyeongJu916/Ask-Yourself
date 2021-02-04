import React from 'react';
import { post } from 'axios';
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

    handleFormSubmit(e) {
        e.preventDefault();
        this.Login()
        .then((response) => {
            console.log(response.data);
        })
        //this.props.history.push("/");
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

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                ID <input type = "text" name = "id" value = {this.state.id} onChange={this.handleValueChange}/> <br/> 
                비밀번호 <input type = "password" name = "pw" value = {this.state.pw} onChange={this.handleValueChange}/> <br/>
                <button type = "submit"> 로그인 </button>
                <button>회원가입</button>
            </form>
        );
    }
}

export default SignIn;