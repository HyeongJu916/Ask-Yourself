
import React, { Component } from 'react';
import like from '../images/testlike.png';
import share from '../images/testshare.png';


class TestList extends Component {
  render() {
    console.log('TestList render');
    var lists = [];
    var tests = this.props.tests;
    var i = 0;
    while (i < tests.length) {
      if (tests[i].status === "yes") {
        lists.push(
          <li key={tests[i].id} className="test">
            <div className="test-info">
              <p>{tests[i].title}</p>
              <h6>{tests[i].date}</h6>
            </div>
            <div className="test-result">
              <div className="sub-icon">
                <a href=""><img src={share} width='50' height='50'></img></a>
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
          <li key={tests[i].id} className="test">
            <div className="test-info">
              <p>{tests[i].title}</p>
              <h6>{tests[i].date}</h6>
            </div>
            <div className="test-result-second">
              <div className="sub-icon">
                <a href=""><img src={share} width='50' height='50'></img></a>
                <a href=""><img src={like} width='50' height='50'></img></a>
              </div>
              <div className="flex">
                <a className="btn-result"  href={"/test.html/" + tests[i].id}
                  data-id={tests[i].id}
                  onClick={function (e) {
                    e.preventDefault();
                  }.bind(this)}>시험 시작하기 </a>
              </div>
            </div>
          </li>)
        i = i + 1;
      }
    }
    return (
      <div className="test-over">
        <div>
          <div>
            <h1 className="title"> 나의 테스트 </h1>
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