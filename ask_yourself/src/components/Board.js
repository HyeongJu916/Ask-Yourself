import React, { Component } from 'react';
import CreateTest from './CreateTest';
import Profile from './Profile';
import TestList from './TestList';


class Board extends Component {
    render() {
        console.log('TestList render');
        var mode = this.props.mode;
        if (mode === "testCreate") {
            return (
                <div>
                    <CreateTest
                        user={this.props.user}
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
        }
    }
}

export default Board;