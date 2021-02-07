import React from 'react';
import { post } from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            id: '',
            pw: '',
            pwCheck: '',
            email: ''
        }
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addUser = this.addUser.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.addUser()
        .then((response) => {
            console.log(response.data);
        })
        //this.props.history.push("/");
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addUser() {
        const url = '/api/users';
        const formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('id', this.state.id)
        formData.append('pw', this.state.pw)
        formData.append('email', this.state.email)
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
                <h1>SignUp</h1>
                이름 <input type = "text" name = "name" value = {this.state.name} onChange={this.handleValueChange}/> <br/>
                ID <input type = "text" name = "id" value = {this.state.id} onChange={this.handleValueChange}/> <br/> 
                비밀번호 <input type = "password" name = "pw" value = {this.state.pw} onChange={this.handleValueChange}/> <br/>
                비밀번호 확인 <input type = "password" name = "pwCheck" value = {this.state.pwCheck} onChange={this.handleValueChange}/> <br/>
                e-mail <input type = "email" name = "email" value = {this.state.email} onChange={this.handleValueChange}/> <br/>
                <button type="submit">회원가입</button>
            </form>
        );
    }
}

export default SignUp;