import React, { Component } from 'react';
import CreateTest from './CreateTest';
import Profile from './Profile';
import TestList from './TestList';
import CreateTestDone from './CreateTestDone'


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
                        onChangePageCreate={this.props.onChangePageCreate}
                    ></TestList>
                </div>
            );
        } else if (mode === "testCreatedone") {
            return (
                <div>
                    <CreateTestDone>
                    </CreateTestDone>
                </div>
            );
        }
    }
}

export default Board;