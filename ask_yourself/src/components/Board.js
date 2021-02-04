import React, { Component } from 'react';

class Board extends Component {
    render() {
        console.log('TestList render');
        var lists = [];
        var tests = this.props.tests;
        var i = 0;
        while (i < tests.length) {
            if(tests[i].status === "yes"){
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
                            <a href={"/test.html/" + tests[i].id}
                                data-id={tests[i].id}
                                onClick={function (e) {
                                    e.preventDefault();
                                }.bind(this)}
                            >{tests[i].title}</a><br />
                            {tests[i].date}
                        </div>
                        <button>
                            시험시작하기
                        </button>
                    </li>)
                i = i + 1;
            }
        }
        if (tests.length != 0) {
            return (
                <div className="flex">
                    <div className="profile">
                        <div className="profile-box">
                            <img className="profile-image" src={this.props.profimg} />
                        </div>
                        <h2> User </h2>
                        <div className="user_status">
                            <h6 text-align="middle">완료한 테스트
                            진행중인 테스트</h6>
                        </div>
                    </div>
                    <div>
                        <div className="flex">
                            <div>
                                <h1> 나의 테스트 </h1>
                            </div>
                            <div>
                                <button onClick={function (e) {
                                    e.preventDefault();
                                    this.props.onChangePage(e.target.dataset.id);
                                }.bind(this)}>
                                    +새로운 테스트 만들기
                                </button>
                            </div>
                        </div>
                        <ul>
                            {lists}
                        </ul>
                    </div>

                </div>
            );
        } else {
            return {

            }
        }

    }
}

export default Board;