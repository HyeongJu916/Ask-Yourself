import React from 'react';
import '../TestPage.css';
import CreateTest from './CreateTest';
import TestList from './TestList';
import CreateTestDone from './CreateTestDone';
import Board from './Board';

class MyGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        }
    }

    componentDidMount() {
        this.myGroups()
        .then(res => this.setState({groups: res}))
        .catch(err => console.log(err));
    }

    myGroups = () => {
        const response = fetch('/users/2/group');
        const body = response.json();
        return body;
    }

    showGroup = (e) => {
        this.render() {
            return(
                <Group/>
            );
        }
    }

    render() {
        let n = 0;
        let lists = [];
        const groups = this.state;
        while (n < groups.length) {
            let imgSrc = "../images/group" + (n+1) + ".png"; 
            lists.push(
                <button onClick={this.showGroup}>
                    <img src={this.imgSRc} /> <br/>
                    <p>{groups.title}</p>
                    <p>장형주 님 외 {groups.userCount - 1}명</p>
                </button>
            );

            if ((n + 1) % 3 == 0) {
                lists.push(<br/>);
            }
        }
        return(
            <div>
                <h3>나의 그룹</h3>
                <ul>
                    { lists }
                </ul>
            </div>

        );
    }
}



export default MyGroups;