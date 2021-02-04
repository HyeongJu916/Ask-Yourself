import React, { Component } from 'react';



class Board extends Component {
    render() {
        console.log('TestList render');
        var lists = [];
        var tests = this.props.tests;
        var mode = this.props.mode;
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
        if (mode === "testCreate") {
            return (
                <div className="test-create">
                    <div className="title">
                        <h1>새로운 테스트 만들기</h1></div>
                    <div className="file-input">
                        <div>
                            <label className="input-file-button" for="input-file">
                                테스트 생성을 위한 학습자료를 업로드해주세요 <br /> (.gif, .jpg, .png)
                            </label>
                            <input type="file" accept=".gif, .jpg, .png" id="input-file" style={{ display: "none" }} />
                        </div>
                    </div>
                    <div>
                        <a href=""
                            onClick={function (e) {

                                this.props.onChangePageMypage();
                            }.bind(this)}>
                            완료
                        </a>
                        <a href=""
                            onClick={function (e) {
                                alert("삭제하시겠습니까?");
                                this.props.onChangePageMypage();
                            }.bind(this)}>
                            삭제
                        </a>
                    </div>
                </div>
            );
        } else if (mode === "mypage") {
            return (
                <div className="flex">
                    <div className="profile">
                        <div className="profile-box">
                            <img className="profile-image" src={this.props.user.imgurl} />
                        </div>
                        <div>
                            <h2> {this.props.user.userid} </h2>
                        </div>
                        <div className="flex">
                            <div className="mytest-all">
                                <h6>완료된 테스트<br />시작 전 테스트</h6>
                            </div>
                            <div className="mytest-all">
                                <h6>{this.props.user.solved}<br />{this.props.user.notsolved}</h6>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex">
                            <div className="title">
                                <h1> 나의 테스트 </h1>
                            </div>
                            <div>
                                <a href="#"
                                    onClick={function (e) {
                                        this.props.onChangePageCreate();
                                    }.bind(this)}>
                                    Click me
                            </a>
                            </div>
                        </div>
                        <ul>
                            {lists}
                        </ul>
                    </div>

                </div>
            );
        }
    }
}

export default Board;