import './App.css';
import React, { Component } from 'react';
import TestList from "./components/TestList";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import basic_profile from "./images/basic_profile.svg";

//상위->하위 : props
//하위->상위 : event

class App extends Component{
  constructor(props){ // 컴포넌트 초기화
    super(props);
    this.state ={
      mode: 'welcome',
      selected_content_id:2,
      welcome: {
        userid: 1,
        solved: 2,
        notsolved: 1,
        profimg: {basic_profile}
      },
      nav:{title:'Ask for Question'},
      contents:[
        {id:1, title:'Test1', date: '2021/02/02', status: 'no', all: '', correct: ''},
        {id:2, title:'Test2', date: '2021/02/02', status: 'yes', all: '7', correct: '10'},
        {id:3, title:'Test3', date: '2021/02/02', status: 'no', all: '', correct: ''},
      ],
    }
  }
  render() {
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read'){
      var i =0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id == this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i+1;
      }
    }
    console.log('render', this)
    return (
      <div className="App">
       <Nav l
        title={this.state.nav.title}
        onChangePage={function() {
          this.setState({mode:'welcome'})
        }.bind(this)}>
       </Nav>
       <div className="board">
         <Profile
          profimg={this.state.profimg}>
         </Profile>
         <TestList onChangePage={function(id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
       ></TestList>
       </div>

      </div>
    );
  }
}


export default App;
