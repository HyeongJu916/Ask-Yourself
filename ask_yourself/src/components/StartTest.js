import React from 'react';
import { post } from 'axios';
import '../TestPage.css';
import TestResult from './TestResult';
import Moment from 'moment';

class StartTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'read',
            questions: [{
                qid : '1',
                question: "What is your favorite color?"
            },
            {
                qid : '2',
                question: "What is your favorite food?"
            },
            {
                qid : '3',
                question: "What is your favorite brand?"
            }],
            myAnswers: []
        }
    }

    componentDidMount() {
        this.getQuestions()
        .then(res => this.setState({questions: res}))
        .catch(err => console.log(err));
    }

    getQuestions = async() => {
        const response = await fetch('https://askyourself.herokuapp.com/users/1/group/tests/' + this.props.testId)
        const body = await response.json();
        return body;
    }

    handleValueChange = (e) => {
        const id = e.target.id;
        const data = e.target.value;
        let exist = 0;
        const { myAnswers } = this.state;

        let i = 0;
        while (i < myAnswers.length) {
            if (id === myAnswers[i].qid) {
                myAnswers[i].answer = data;
                exist = 1;
            }
            i++;
        }

        if (exist === 0) {
            this.setState((prevState) => {
                let newAnswers = [...prevState.myAnswers];
                newAnswers = [...prevState.myAnswers, {qid: id, answer: data}];
                this.setState({myAnswers: newAnswers});
            })
        }
        console.log(myAnswers);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.sendAnswer()
        .then((response) => {
            console.log(response.data);
            this.setState({mode: "result"})
        })
        .catch(err => console.log(err));
        //this.props.history.push("/");
    }

    sendAnswer = () => {
        // tid, {qid, }
        const url = 'https://askyourself.herokuapp.com/users/1/group/${this.props.testId}/result';
        const formData = new FormData();
        formData.append('myAnswers', this.state.myAnswers)
        /*const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }*/
        return post(url, formData)
    }

    render() {
        let num = 0;
        let cards = [];
        const questions = this.state.questions;
        while (num < questions.length) {
            cards.push(
                <li key = {num+1}> 
                    <div className = "qCard">
                        <p className = "title">질문 {num + 1}</p>
                        <div className = "question">
                            {questions[num].question}
                        </div>
                    </div>
                    <div className = "aCard">
                        <p className = "title">나의 답변</p>
                        <textarea className = "answer" id={questions[num].qid} value={this.state.myAnswers.answer} onChange={this.handleValueChange}/>
                    </div>
                </li>
            )
            num++;
        }
        let mode = this.state.mode;
        if (mode === "result") {
            return(
                <div>
                    <TestResult testId = {this.props.testId} testName = {this.props.testName} testDate = {new Date().toLocaleString()} total = {this.state.questions.length} dateGenerated = {this.props.dateGenerated}/>
                </div>
            );
        }
        else if (mode === "leave") {
            
        }
        else {
            return (
                <form onSubmit={this.handleFormSubmit}>
                    <div className="flex-wrapper">
                        <p className="testName"> {this.props.testName} </p>
                        <h3 className="dateGenerated"> {this.props.dateGenerated} </h3>
                        <div className="cards">
                            <ul>
                                {cards}
                            </ul>

                            <button type="submit" className="submitAnswer">
                                <a href="#" className = "submitLink" onClick = {function(e) {
                                    this.setState({mode: "result"});
                                }.bind(this)}>제출하기</a>
                            </button>
                            <button className="leavePage">
                                <a href="#" className = "leaveLink" onClick = {function(e) {
                                this.setState({mode: "leave"});
                            }.bind(this)}>나가기</a>
                            </button>
                            <br/>
                        </div>
                    </div>
                </form>
            );
        }
    }
}

export default StartTest;