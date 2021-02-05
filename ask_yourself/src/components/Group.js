import React from 'react';
import '../TestPage.css';
//import Board from './Board';


class Group extends React.Component {
    constructor(props) {
        console.log('Group render');
        super(props);
        this.state = {
            ranks : [],
            groupInfo: {
                members: [
                    {
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
                      }
                ],
                tests : [
                    {
                        title: "테스트1",
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
                        title: "테스트2",
                        correct_count: 1,
                        question_count: 3,
                        examed_at: "2021-02-05T18:22:21.000Z",
                        created_at: "2021-02-05T17:22:21.000Z",
                        updated_at: "2021-02-05T17:22:21.000Z",
                        tid: 2,
                        uid: 2,
                        gid: 1
                      }
                ]
            }
        }
    }

    componentDidMount() {
        /*this.getGroupInfo()
        .then(res => this.setState({groupInfo: res}))
        .catch(err => console.log(err));*/
    }

    getGroupInfo = () => {
        const response = fetch('/groups/' + this.props.gid)
        const body = response.json();
        return body;
    }

    render() {
        let myAchieve = 0;
        let myContrib = 0;
        let sum = 0;
        let n = 0;
        let total = this.state.groupInfo.tests.length;
        const tests = this.state.groupInfo.tests;
        console.log(tests.length);
        while (n < tests.length) {
            console.log(n);
            console.log(tests[n]);
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
            console.log(this.state.ranks);
        }
        let ranks = this.state.ranks;
        let sortingField = "score";
        ranks.sort((a, b) => (a.score < b.score) ? 1 : -1)
        console.log(ranks);
        n = 0;
        return(
            /*<Board/>*/
            <div>
                <h3>나의 그룹 / {this.props.title}</h3>
                <h1>{this.props.title}</h1>
                <p>장형주 님 외 {this.props.userCount - 1}명</p>
                <div>
                    <ul>
                        {this.state.ranks.slice(3).map(r => {
                            return (
                                <div>
                                    <p>{++n}</p>
                                    <p>{r.uid}</p>
                                </div>
                            );
                        })}
                    </ul>
                    <div>
                        <div>
                            <p>나의 학습 성취도</p>
                            <div>{myAchieve}</div>
                        </div>
                        <div>
                            <p>나의 스터디 그룹 기여도</p>
                            <div>{myContrib}</div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Group;