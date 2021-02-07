import React from 'react';
import '../Group.css';
import group1 from '../images/group1.png';
//import CreateTest from './CreateTest';
//import TestList from './TestList';
//import CreateTestDone from './CreateTestDone';
//import Board from './Board';
import Group from './Group';
import axios from 'axios';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

class MyGroups extends React.Component {
    constructor(props) {
        console.log('MyGroups render');
        super(props);
        this.state = {
            mode: 'myGroups',
            groups: [/*{
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
            }*/]
        }
    }

    componentDidMount() {
        const { myGroups } = this; myGroups();
        /*this.myGroups()
        .then(res => {this.setState({groups: res.groups}); console.log(res.groups)})
        .catch(err => console.log(err));*/
    }

    myGroups = async() => {
        try {
            let url = 'https://askyourself.herokuapp.com/users/1/group';
            const response = await axios.get(url);
            this.setState({groups: response.data.result.groups});
            console.log(this.state.groups);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let n = 0;
        let mode = this.state.mode;
        if (mode === "viewGroup") {
            return (
                <div>
                    <Group uid={this.props.uid} gid={this.state.gid} title={this.state.title} userCount={this.state.userCount} />
                </div>
            );
        }
        else {
            return (
                <Router>
                    <header />
                    <div>
                        <div>
                            <div className = "buttonGroup">
                                <div>
                                    <h1 className="myGroup">나의 그룹</h1>
                                </div>
                                {this.state.groups ? this.state.groups.map(g => {
                                    return (
                                        <div className="buttonDiv">
                                            <Link to={"/group/" + g.title}>
                                                <button className="button" onClick={function (e) {
                                                    this.setState({ mode: "viewGroup", gid: g.gid, title: g.title, userCount: g.userCount });
                                                }.bind(this)}>
                                                    <img className="img" src={group1} alt="groupProfile" /> <br />
                                                    <div className="groupInfo">
                                                        <p className="grpTitle">{g.title}</p>
                                                        <p className="headCnt">장형주 님 외 {g.userCount - 1}명</p>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>
                                    );
                                }): ''}
                            </div>
                            <div>
                                {/*<Switch>
                                <Route exact path = "/group/" component = {MyGroups} />
                                <Route path = "/group/:gid" component = { Group } />
                                {this.state.groups.map(g => {
                                    let path = "/group/" + g.title;
                                    console.log(path);
                                    return <Route path={path} render={() => <Group uid={this.props.uid} gid={g.gid} title={g.title} userCount={g.userCount} />} />
                                })
                                }
                            </Switch>*/}
                            </div>
                        </div>
                    </div>
                </Router>
            );
        }
    }
}

export default MyGroups;