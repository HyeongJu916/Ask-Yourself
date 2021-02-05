import React from 'react';
import '../Group.css';
//import CreateTest from './CreateTest';
//import TestList from './TestList';
//import CreateTestDone from './CreateTestDone';
//import Board from './Board';
import Group from './Group';

class MyGroups extends React.Component {
    constructor(props) {
        console.log('MyGroups render');
        super(props);
        this.state = {
            mode: 'myGroups',
            gid: '',
            title: '',
            userCount: '',
            groups: [{
                gid: 1,
                title: "알고방",
                userCount: 5
            },
            {
                gid: 3,
                title: "정처기방",
                userCount: 10

            },
            {
                gid: 5,
                title: "운체방",
                userCount: 7
            }]
        }
    }

    componentDidMount() {
        /*this.myGroups()
        .then(res => this.setState({groups: res}))
        .catch(err => console.log(err));*/
    }

    myGroups = () => {
        const response = fetch('/users/2/group');
        const body = response.json();
        return body;
    }

    render() {
        let n = 0;
        let lists = [];
        const groups = this.state.groups;
        console.log(groups);

        while (n < groups.length) {
            console.log(n);
            console.log(groups[n]);
            let imgSrc = "../images/group" + (n+1) + ".png";
            lists.push(
                <button className = "button" value = {n} onClick={function (e) {
                    let index = e.target.value;
                    this.setState({ mode: "viewGroup", gid: groups[index].gid, title : groups[index].title, userCount: groups[index].userCount});
                }.bind(this)}>
                    <img className = "img" src={this.imgSrc} alt = "groupProfile"/> <br/>
                    <p className = "grpTitle">{groups[n].title}</p>
                    <p className = "headCnt">장형주 님 외 {groups[n].userCount - 1}명</p>
                </button>
            );

            if ((n + 1) % 3 === 0) {
                lists.push(<br/>);
            }
            n++;
        }

        let mode = this.state.mode;
        if (mode === "viewGroup") {
            return(
                <div>
                    <Group uid = {this.props.uid} gid = {this.state.gid} title = {this.state.title} userCount = {this.state.userCount} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <h3>나의 그룹</h3>
                    <ul>
                        {lists}
                    </ul>
                </div>

            );
        }
    }
}

export default MyGroups;