import React from 'react';
import '../TestPage.css';
import Board from './Board';
import TestList from './TestList';
import axios from 'axios';

class Group extends React.Component {
    constructor(props) {
        console.log('Group render');
        super(props);
        console.log(this.props.uid);
        this.state = {
            ranks: [],
            members: [
                /*{
                    id: "3",
                    image_url: "https://storage.googleapis.com/evenshunshine/default.png",
                    title: "그룹1"
                },
                {
                    id: "9",
                    image_url: "https://storage.googleapis.com/evenshunshine/default.png",
                    title: "그룹1"
                },
                {
                    id: "2",
                    image_url: "https://storage.googleapis.com/evenshunshine/default.png",
                    title: "그룹1"
                }*/
            ],
            tests: [
                /*{
                    title: "T1",
                    correct_count: null,
                    question_count: 3,
                    examed_at: null,
                    created_at: "2021-02-05T17:22:21.000Z",
                    updated_at: "2021-02-05T17:22:21.000Z",
                    tid: 1,
                    uid: 2,
                    gid: 1
                },
                {
                    title: "T2",
                    correct_count: 1,
                    question_count: 3,
                    examed_at: "2021-02-05T18:22:21.000Z",
                    created_at: "2021-02-05T17:22:21.000Z",
                    updated_at: "2021-02-05T17:22:21.000Z",
                    tid: 2,
                    uid: 2,
                    gid: 1
                },
                {
                    title: "T3",
                    correct_count: 1,
                    question_count: 3,
                    examed_at: "2021-02-05T18:22:21.000Z",
                    created_at: "2021-02-05T17:22:21.000Z",
                    updated_at: "2021-02-05T17:22:21.000Z",
                    tid: 2,
                    uid: 2,
                    gid: 1
                },
                {
                    title: "T4",
                    correct_count: 1,
                    question_count: 3,
                    examed_at: "2021-02-05T18:22:21.000Z",
                    created_at: "2021-02-05T17:22:21.000Z",
                    updated_at: "2021-02-05T17:22:21.000Z",
                    tid: 2,
                    uid: 2,
                    gid: 1
                }*/
            ]
        }
    }

    componentDidMount() {
        const { handlePost } = this; handlePost();
        //const { getGroupInfo } = this; getGroupInfo();
    }

    /*getGroupInfo = async() => {
        try {
            const url = 'https://askyourself.herokuapp.com/groups/1';
            const response = await axios.get(url);
            this.setState({members: [response.data.result.members], tests: [response.data.result.tests]});
            console.log(response.data.result);
            console.log(this.state.members);
            console.log(this.state.tests);
        } catch (e) {
            console.log(e);
        }
    }*/

    handlePost() {
        const url = 'http://ec2-15-164-49-176.ap-northeast-2.compute.amazonaws.com/groups/1'; 
        const formData = { uid: 1};
        const response = axios.post(url, formData);

        return axios.post(url, formData).then((res) => {
            this.setState({ members: response.data.result.members});
            this.setState({ tests: [response.data.result.tests]});
            console.log(this.state.members);
            console.log(this.state.tests);
        }) .catch(err => {
            console.log(err);
        }) 
    }

    render() {
        let myAchieve = 78;
        let myContrib = 20;
        let sum = 0;
        let n = 0;
        let total = this.state.tests.length;
        const tests = this.state.tests;
        console.log(tests.length);
        while (n < tests.length) {
            if (tests[n].uid === this.props.uid) {
                // 맞힌 문제수 / 전체문제수
                //myAchieve = tests[n].
                //myContrib = members[n].
                // sum = ( + ) / 2;
            }
            else {
                // sum = 
            }
            /*this.setState((prevState) => {
                let newRanks = [...prevState.ranks];
                newRanks = [...prevState.ranks, {uid: tests[n].uid, score: sum}];
                this.setState({ranks: newRanks});
            })*/
            sum = 0;
            n++;
        }
        let ranks = this.state.ranks;
        let sortingField = "score";
        ranks.sort((a, b) => (a.score < b.score) ? 1 : -1)
        console.log(ranks);
        n = 0;

        return(
            <div>
                <div className = "groupTitle">
                    <h3>나의 그룹 /</h3>
                    <h1>{this.props.title}</h1>
                    <p>장형주 님 외 {this.props.userCount - 1}명</p>
                    <br/>
                </div>
                <div className = "group-tests">
                <p className = "sharedTitle">공유된 테스트</p>
                <div className = "testList">
                    {console.log(this.state.tests)}
                    <TestList tests={this.state.tests} gid={this.props.gid} onChangePageCreate={this.props.onChangePageCreate}/>
                </div>
                <div>
                    <ul>
                        {ranks.slice(3).map(r => {
                            return (
                                <div>
                                    <p>{++n}</p>
                                    <p>{r.uid}</p>
                                </div>
                            );
                        })}
                    </ul>
                    <div className = "achieve">
                        <div>
                            <p>나의 학습 성취도</p>
                            <div className = "achieveBox">{myAchieve}%</div>
                        </div>
                        <div>
                            <p>나의 스터디 그룹 기여도</p>
                            <div className = "achieveBox">{myContrib}%</div>
                        </div>
                    </div>
                    <div className = "rank">
                        <p>멤버 순위</p>
                        <div className = "box">1 &nbsp;&nbsp;A</div>
                        <div className = "box">2 &nbsp;&nbsp;B</div>
                        <div className = "box">3 &nbsp;&nbsp;C</div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Group;