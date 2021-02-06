import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import Board from './components/Board';

class Home extends Component {
  constructor(props) { // 컴포넌트 초기화
    super(props);
    this.state = {
      mode: 'mypage',
      user: {
        id: '',
        solvedCount: '',
        unsolvedCount: '',
        imageUrl: ''
      },
      testList: [
      ], 
      groups: [{ gid: 1, title: "알고방", userCount: 5 },
      { gid: 3, title: "정처기방", userCount: 10 },
      { gid: 5, itle: "운체방", userCount: 7}]
    }
  }

  getProfile = async (userid) => { 
    try { 
      var url = "https://askyourself.herokuapp.com/users/1/profile"
      const response = await axios.get(url); 
      this.setState({ user: response.data.result }); 
      console.log();
    } catch (e) { 
      console.log(e); 
    } 
  };

  getTests = async (userid) => {
    try {   
      var url = "https://askyourself.herokuapp.com/tests/all/1"
      const response = await axios.get(url); 
      this.setState({ testList: response.data.result.test}); 
      console.log(response.data.result.test); 
    } catch (e) { 
      console.log(e); 
    } 
}

  getGroups = async (userid) => { 
    try { 
      var url = "https://askyourself.herokuapp.com/groups"
  
      const formData = new FormData();
      formData.append('uid', 1);
      const config = {
        headers: {
            'content-type': 'application/json'
        }
      };

      const response = await axios.post( url, formData);
      
      this.setState({  groupList: response }); 

      console.log(response);

    } catch (e) { 
      console.log(e); 
    } 
  }; 

  //마운트 될때 실행 
  componentDidMount() { 
    const { getProfile } = this; getProfile(this.props.userid); 
    const { getTests } = this; getTests(this.props.userid); 
    const { getGroups } = this; getGroups(this.props.userid); 
  }

  render() {
    console.log(this.state.test);
    return (
      <div className="App">
        <Board
          mode={this.state.mode}
          user={this.state.user}
          testList={this.state.testList}
          onChangePageCreate={function () {
            this.setState({ mode: 'testCreate' })
          }.bind(this)}
          onChangePageCreateDone={function (tid) {
            this.setState({ mode: 'testCreatedone' })
          }.bind(this)}
          onChangePageStartTest={function () {
            this.setState({ mode: 'startTest' })
          }.bind(this)}
          onChangePageTestResult={function () {
            this.setState({ mode: 'testResult' })
          }.bind(this)}
          onChangePageReStartTest={function (tid) {
            this.setState({ mode: 'startTest' })
          }.bind(this)}
          loadModal={this.loadModal}
          groupList={this.props.groups}
        >
        </Board>

      </div>
    );
  }
}


export default Home;
