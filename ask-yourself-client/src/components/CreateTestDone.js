import React, { Component } from 'react';
import '../CreateTest.css'
import createMyTestDone from '../images/Create_Mytest_Done.png';
import '../CreateTestDone.css'
import like from '../images/testlike.png';
import share from '../images/testshare.png';


class CreateTestDone extends Component{
    render() {
        return (
            <div className="CTD-done" >
                <div className="CTD-done-content">
                    <img src={createMyTestDone} width='450' height='450'/>
                    <p><br/>테스트가 성공적으로 완성되었습니다 ! <br/><br/>
                        테스트를 친구들과 공유하고 <br/>
                        함께 공부해보세요.</p>
                    <div className="CTD-btns">
                        <a href=""><img src={share} width='80' height='80' /></a>
                        <a href=""><img src={like} width='80' height='80' /></a>
                    </div>
                    <div className="CTD-test-btn">
                        <a href="" onClick={function (e) {
                            this.props.onChangePageTestStart();
                            e.preventDefault();
                        }.bind(this)}>
                            <p className="CTD-test-btn-font">시험보기</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTestDone;