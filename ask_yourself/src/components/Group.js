import React from 'react';
import '../TestPage.css';
import TestList from './TestList';


class Group extends React.Component {

    componentDidMount() {
        this.getGroupInfo()
        .then(res => this.setState({questions: res}))
        .catch(err => console.log(err));
    }

    getGroupInfo = () => {
        const response = fetch('/groups/' + this.props.groupId)
        const body = response.json();
        return body;
    }
    render() {
        return(
            <div>
                <h3>나의 그룹 / {this.props.title}</h3>
                <h1>{this.props.title}</h1>
                <p>장형주 님 외 {this.props.userCount - 1}명</p>
                <testList />
                <Group/>

            </div>
        );
    }

}






class GroupMember extends React.Component {
    render() {
        <div>
            {this.props.rank} {this.props.uid}
        </div>
    }
}

class Achivement extends React.Component {
    render() {
        <div>
            <div>
                <p>나의 학습 성취도</p>
                <div></div>
            </div>
            <div>

            </div>
        </div>
    }
}

