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
        id: 'User',
        solvedCount: '2',
        unsolvedCount: '1',
        imageUrl: '1'
      },
      testList: [
        { id: 1, title: 'Test1', date: '2021/02/02', status: 'no', all: '', correct: '' },
        { id: 2, title: 'Test2', date: '2021/02/02', status: 'yes', all: '10', correct: '7' },
        { id: 3, title: 'Test3', date: '2021/02/02', status: 'no', all: '', correct: '' }
      ],
      groups: [{ gid: 1, title: "알고방", userCount: 5 },
      { gid: 3, title: "정처기방", userCount: 10 },
      { gid: 5, itle: "운체방", userCount: 7}]
    }
  }

  // gerProfile = async (userid) => { 
  //   try { 
  //     var url = "./api/user/s" + {userid}
  //     const response = await axios.get( ); 
  //     this.setState({  user: response.data }); 
  //   } catch (e) { 
  //     console.log(e); 
  //   } 
  // }; 

  // getTests = async (userid) => { 
  //   try { 
  //     var url = "./api/users/" + {userid} + "/test"
  //     const response = await axios.get( ); 
  //     this.setState({  tests: response.data }); 
  //   } catch (e) { 
  //     console.log(e); 
  //   } 
  // }; 

  // //마운트 될때 실행 
  // componentDidMount() { 
  //   const { gerProfile } = this; gerProfile(this.props.userid); 
  //   const { getTests } = this; getTests(this.props.userid); 
  // }

  render() {
    console.log(this.state.test);
    return (
      <div className="App">
        <script src="../public/js/prefixfree.min.js"></script>
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
