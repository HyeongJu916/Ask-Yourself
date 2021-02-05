import React from 'react';
import '../TestPage.css';
import Board from './Board';


class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupInfo: []
        }
    }

    componentDidMount() {
        this.getGroupInfo()
        .then(res => this.setState({groupInfo: res}))
        .catch(err => console.log(err));
    }

    getGroupInfo = () => {
        const response = fetch('/groups/' + this.props.groupId)
        const body = response.json();
        return body;
    }

    render() {
        let myAchieve = 0;
        let myContrib = 0;
        let count = 0;

        
        return(
            <div>
                <h3>나의 그룹 / {this.props.title}</h3>
                <h1>{this.props.title}</h1>
                <p>장형주 님 외 {this.props.userCount - 1}명</p>
                <Board />
                <GroupMember lists = {this.lists} achieve = {this.myAchieve} myContrib = {this.myContrib}/>
            </div>
        );
    }
}

class GroupMember extends React.Component {
    render() {
        <div>
            <ul>
                { this.props.lists }
            </ul>
            <Achievement achieve = {this.achieve} contribution = {this.myContrib} />
        </div>
    }
}

class Achievement extends React.Component {
    render() {
        <div>
            <div>
                <p>나의 학습 성취도</p>
                <div>{this.props.achieve}</div>
            </div>
            <div>
                <p>나의 스터디 그룹 기여도</p>
                <div>{this.props.contribution}</div>

            </div>
        </div>
    }
}

export default Group;