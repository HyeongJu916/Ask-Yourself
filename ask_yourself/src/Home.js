import React, { Component } from 'react';
import './Home.css';
import Board from './components/Board';

class Home extends Component{
  constructor(props){ // 컴포넌트 초기화
    super(props);
    this.state ={
      mode: 'mypage',
      selected_content_id:2,
      user: {
        userid: 'User',
        solved: '2',
        notsolved: '1',
        imgurl: '1'
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
    } else if(this.state.mode === 'testCreate'){
      _user = this.state.user;
    }
    console.log('render', this)
    return (
      <div className="App">
        <script src="../public/js/prefixfree.min.js"></script>
       <Board
        mode={this.state.mode}
        user={this.state.user}
        tests={this.state.tests}
        onChangePageMypage={function() {
          this.setState({mode:'mypage'})
        }.bind(this)}
        onChangePageCreate={function() {
          this.setState({mode:'testCreate'})
        }.bind(this)}
        >
       </Board>

      </div>
    );
  }
}


export default Home;
