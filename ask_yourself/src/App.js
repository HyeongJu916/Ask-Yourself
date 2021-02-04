import './App.css';
import React, { Component } from 'react';
import TestList from "./components/TestList";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import basic_profile from "./images/basic_profile.svg";
import Board from './components/Board';

//상위->하위 : props
//하위->상위 : event

class App extends Component{
  constructor(props){ // 컴포넌트 초기화
    super(props);
    this.state ={
      mode: 'mypage',
      selected_content_id:2,
      user: {
        userid: 1,
        solved: 2,
        notsolved: 1,
        profimg: {basic_profile}
      },
      nav:{title:'Ask for Question'},
      tests:[
        {id:1, title:'Test1', date: '2021/02/02', status: 'no', all: '', correct: ''},
        {id:2, title:'Test2', date: '2021/02/02', status: 'yes', all: '10', correct: '7'},
        {id:3, title:'Test3', date: '2021/02/02', status: 'no', all: '', correct: ''},
      ],
    }
  }
  render() {
    console.log('App render');
    var _user, _tests = null
    if(this.state.mode === 'mypage'){
      _user = this.state.user;
      _tests = this.state.tests;
    } else if(this.state.mode === 'test create'){
      _user = this.state.user;
    }
    console.log('render', this)
    return (
      <div className="App">
        <script src="../public/js/prefixfree.min.js"></script>
       <Nav 
        title={this.state.nav.title}
        onChangePage={function() {
          this.setState({mode:'welcome'})
        }.bind(this)}>
       </Nav>
       <Board
        user={this.state.user}
        tests={this.state.tests}
        onChangePageMypage={function() {
          this.setState({mode:'mypage'})
        }.bind(this)}
        onChangePageCreate={function() {
          this.setState({mode:'test create'})
        }.bind(this)}
        >
       </Board>

      </div>
    );
  }
}


export default App;
