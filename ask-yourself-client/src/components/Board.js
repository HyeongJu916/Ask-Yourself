import React, { Component } from 'react';
import CreateTest from './CreateTest';
import Profile from './Profile';
import TestList from './TestList';
import CreateTestDone from './CreateTestDone';
import StartTest from './StartTest';
import TestResult from './TestResult';

class Board extends Component {
    render() {
        console.log('TestList render');
        var mode = this.props.mode;
        if (mode === "testCreate") {
            return (
                <div>
                    <CreateTest
                        user={this.props.user}
                        onChangePageCreateDone={this.props.onChangePageCreateDone}
                    ></CreateTest>
                </div>
            );
        } else if (mode === "mypage") {
            return (
                <div className="flex">
                    <Profile
                        user={this.props.user}
                    ></Profile>
                    <TestList
                        tests={this.props.tests}
                        onChangePageTestStart={this.props.onChangePageStartTest}
                        onChangePageCreate={this.props.onChangePageCreate}
                    ></TestList>
                </div>
            );
        } else if (mode === "testCreatedone") {
            return (
                <div>
                    <CreateTestDone
                        onChangePageTestStart={this.props.onChangePageStartTest}
                    >
                    </CreateTestDone>
                </div>
            );
        } else if (mode === "startTest") {
            return (
                <div>
                    <StartTest
                        onChangePageTestResult={this.props.onChangePageTestResult}
                    >
                    </StartTest>
                </div>
            );
        } else if (mode === "testResult") {
            return (
                <div>
                    <TestResult
                        onChangePageReStartTest={this.props.onChangePageReStartTest}
                    >
                    </TestResult>
                </div>
            );
        }
    }
}

export default Board;