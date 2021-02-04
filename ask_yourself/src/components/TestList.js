
import React, { Component } from 'react';

class TestList extends Component{
    render(){
      console.log('TestList render');
      var lists = [];
      var tests = this.props.tests;
      var i = 0;
      while (i < tests.length) {
        if (tests[i].status === "yes") {
            lists.push(
                <li key={tests[i].id} className="test">
                    <div>
                        <a href={"/test.html/" + tests[i].id}
                            data-id={tests[i].id}
                            onClick={function (e) {
                                e.preventDefault();
                            }.bind(this)}
                        >{tests[i].title}</a><br />
                        {tests[i].date}
                    </div>
                    <div>
                        {tests[i].correct} / {tests[i].all}
                        <div class="flex">
                            <button>결과보기</button>
                            <button>재시험보기</button>
                        </div>
                    </div>
                </li>)
            i = i + 1;
        } else {
            lists.push(
                <li key={tests[i].id} className="test">
                    <div>
                        {tests[i].title}<br />
                        {tests[i].date}
                    </div>
                    <div>
                        <a href={"/test.html/" + tests[i].id}
                            data-id={tests[i].id}
                            onClick={function (e) {
                                e.preventDefault();
                            }.bind(this)}
                        >
                            시험시작하기
                        </a>
                    </div>
                </li>)
            i = i + 1;
        }
    }
      return (
        <div>
          <div className="flex">
            <div>
              <h1 className="title"> 나의 테스트 </h1>
            </div>
            <div >
              <a href="#" className="testbtn"
                onClick={function (e) {
                  this.props.onChangePageCreate();
                }.bind(this)}>
                + 새로운 테스트 만들기
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