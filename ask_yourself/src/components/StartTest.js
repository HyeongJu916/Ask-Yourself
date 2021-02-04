import React from 'react';
import '../App.css';
import Test from './Test';
import { post } from 'axios';
import { TextField } from '@material-ui/core';

let testId = 1;
let testName = 'Test ' + testId;
let dateGenerated = new Date().toLocaleDateString();

class StartTest extends React.Component {
    constructor(props) {
        super(props);
        /*let testId = this.props.testId;
        let testName = this.props.testName;
        let testGenerated = this.props.testGenerated;*/
        this.id = 1;
        this.state = {
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
            answers: [{
                qid: '',
                answer: ''
            }]
        }
    }

    componentDidMount() {
        /*this.getQuestions()
        .then(res => this.setState({questions: res}))
        .catch(err => console.log(err));*/
    }

    getQuestions = () => {
        const response = fetch('/tests/' + this.props.testId)
        const body = response.json();
        return body;
    }

    handleCreate = (e) => {
        const id = e.target.id;
        const data = e.target.value;
        const { answers } = this.state;
        this.setState({
            answers : answers.concat({qid: id, answer: data})
            /*answers: answers.map(
                info => id === info.qid
                ? {...info, ...data}
                : info.concat({qid: id, answer: data})
            )*/
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.sendAnswer()
        .then((response) => {
            console.log(response.data);
        })
        //this.props.history.push("/");
    }

    sendAnswer = () => {
        const url = '/api/' + testId + '/result';
        const formData = new FormData();
        formData.append('answers', this.state.answers)
        /*formData.append('pw', this.state.pw)
        const config = {
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
            console.log(num);
            console.log(questions[num]);
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
                        <textarea id={questions[num].qid} value={this.state.answers.answer} onChange={this.handleValueChange}/>
                    </div>
                </li>
            )
            num++;
        }
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className = "wrapper">
                    <p className="testName"> {testName} </p>
                    <h3 className="dateGenerated"> {dateGenerated} </h3>
                    <div className="cards">
                        <ul className="cards">
                            {cards}
                        </ul>

                        <button type="submit" className="submitAnswer"> 제출하기 </button>
                        <button className="leavePage">나가기</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default StartTest;