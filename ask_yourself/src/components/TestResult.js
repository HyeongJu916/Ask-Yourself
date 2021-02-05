import React from 'react';
import '../TestPage.css';
import StartTest from './StartTest';

class TestResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'results',
            wrong: [{
                qid : '1',
                question: 'What is your favorite color?',
                answer: 'Navy'
            },{
                qid : '3',
                question: 'What is your favorite brand?',
                answer: 'Nike'
            }]
        }
        console.log(this.props.testId);
        console.log(this.props.testName);
        console.log(this.props.testDate);
        console.log(this.total);
    }

    componentDidMount() {
        /*this.getResults()
        .then(res => this.setState({wrong: res}))
        .catch(err => console.log(err));*/
    }

    getResults = () => {
        const response = fetch('/tests/' + this.props.testId)
        const body = response.json();
        return body;
    }

    render() {
        let num = 0;
        let cards = [];
        const wrong = this.state.wrong;
        console.log(wrong);
        while (num < wrong.length) {
            cards.push(
                <li key = {num+1}> 
                    <div className = "aCard">
                        <p className = "title">질문 {wrong[num].qid}</p>
                        <div className = "question">
                            {wrong[num].question}
                        </div>
                        <button className = "viewAnswer">정답 보기</button>
                    </div>
                </li>
            )
            num++;
        }
        let mode = this.state.mode;
        if (mode === "retest") {
            return(
            <div>
                <StartTest testId = {this.props.testId} testName = {this.props.testName} dateGenerated = {this.props.dateGenerated} testDate = {new Date().toLocaleString()}/>
            </div>
            );
        }
        else if (mode === "leave") {

        }
        else {
            return (
                <div className="flex-wrapper">
                    <div>
                    <p className="testName"> {this.props.testName} </p>
                    <h3 className="dateGenerated"> {this.props.dateGenerated} </h3>
                    </div>
                    <div className="cards">
                        <ul>
                            <li className = "qCard">
                                <table className = "testResult">
                                    <tbody>
                                        <tr>
                                            <td  className = "testInfo">시험 응시일</td>
                                        <td className = "testResult">{this.props.testDate}</td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td className = "testInfo">맞은 갯수</td>
                                        <td className = "testResult">{this.state.wrong.length } / {this.props.total}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </li>
                            <br/><br/>
                            <p className="wrongProbs"> 틀린 문항</p>
                            {cards}
                        </ul>

                        <button type="submit" className="submitAnswer">
                            <a href="#" className="submitLink" onClick={function (e) {
                                this.setState({ mode: "retest" });
                            }.bind(this)}>재시험 보기</a>
                        </button>
                        <button className="leavePage">
                            <a href="#" className="leaveLink" onClick={function (e) {
                                this.setState({ mode: "leave" });
                            }.bind(this)}>나가기</a>
                        </button>
                        <br />
                    </div>
                </div>
            );
        }
    }
}

export default TestResult;