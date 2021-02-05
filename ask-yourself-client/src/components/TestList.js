
import React, { Component } from 'react';
import like from '../images/testlike.png';
import share from '../images/testshare.png';
import Modal from './Share';
import '../Home.css'


class TestList extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false, 
    }
  }
  
  openModal = () => {
    this.setState({ isModalOpen: true });
  }
  
  closeModal = () => {
    this.setState({ isModalOpen: false }); 
  }

  render() {
    let lists = [];
    let testList = this.props.testList;
    let i = 0;
    while (i < testList.length) {
      if (testList[i].status === "yes") {
        lists.push(
          <li key={testList[i].id} className="test">
            <div className="test-info">
              <p>{testList[i].title}</p>
              <h6>{testList[i].date}</h6>
            </div>
            <div className="test-result">
              <div className="sub-icon">
                <a onClick={this.openModal}><img src={share} width='50' height='50'></img></a>
                  <Modal isOpen={this.state.isModalOpen} close={this.closeModal} groupList={this.props.groupList}/>
                <a href=""><img src={like} width='50' height='50'></img></a>
              </div>
              <div className="flex">
                <a href="" className="btn-result" >결과보기</a>
                <a href="" className="btn-result">재시험보기</a>
              </div>
            </div>
          </li>)
        i = i + 1;
      } else {
        lists.push(
          <li key={testList[i].id} className="test">
            <div className="test-info">
              <p>{testList[i].title}</p>
              <h6>{testList[i].date}</h6>
            </div>
            <div className="test-result-second">
              <div className="sub-icon">
                <a onClick={this.openModal}><img src={share} width='50' height='50'></img></a>
                <Modal isOpen={this.state.isModalOpen} close={this.closeModal} />
                <a href=""><img src={like} width='50' height='50'></img></a>
              </div>
              <div className="flex">
                <a className="btn-result"
                  data_id={testList[i].id}
                  onClick={function (e) {
                    this.props.onChangePageTestStart(this.data_id);
                  }.bind(this)}>시험 시작하기 </a>
              </div>
            </div>
          </li>)
        i = i + 1;
      }
    }
    return (
      <div className="my-tests">
        <div className="test-over">
          <div>
            <p className="titleTL"> 나의 테스트 </p>
          </div>
          <div className="testbtn">
            <a href="#" className="testbtn-font"
              onClick={function (e) {
                this.props.onChangePageCreate();
              }.bind(this)}><p className="testbtn-font">+ 새로운 테스트 만들기</p>
            </a>
          </div>
        </div>
        <ul className="testlist">
          {lists}
        </ul>
      </div>
    );
  }
}

export default TestList;