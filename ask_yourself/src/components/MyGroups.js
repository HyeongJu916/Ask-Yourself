import React from 'react';
import '../Group.css';
//import CreateTest from './CreateTest';
//import TestList from './TestList';
//import CreateTestDone from './CreateTestDone';
//import Board from './Board';
import Group from './Group';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

class MyGroups extends React.Component {
    constructor(props) {
        console.log('MyGroups render');
        super(props);
        this.state = {
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

    group = () => {

    }

    render() {
        let n = 0
        let imgSrc = "../images/group";
        return (
            <Router>
                <header />
                <div className = "my-tests">
                    <div className = "test-over">
                        <div>
                            <h1 className="title">나의 그룹</h1>
                        </div>
                        <ul>
                            {this.state.groups.map(g => {
                                return (
                                    <Link to={"/group/" + g.title}>
                                        <button className="button" onClick={function (e) {
                                            this.setState({ mode: "viewGroup", gid: g.gid, title: g.title, userCount: g.userCount });
                                        }.bind(this)}>
                                            <div>
                                                <img className="img" src={imgSrc + (++n) + '.png'} alt="groupProfile" /> <br />
                                            </div>
                                            <p className="grpTitle">{g.title}</p>
                                            <div>
                                                <p className="headCnt">장형주 님 외 {g.userCount - 1}명</p>
                                            </div>
                                        </button>
                                    </Link>
                                );
                            })}
                        </ul>
                        <div>{ console.log(this.props.match)} 
                            {
                                this.props.match.params.title ?
                                <Group uid={this.props.uid} gid={this.props.match.params.gid} title={this.props.match.params.title} userCount={this.props.match.params.userCount} /> : ""
                            }
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

export default MyGroups;