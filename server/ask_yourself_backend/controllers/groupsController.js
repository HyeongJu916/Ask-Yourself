const db        = require("../models");
const moment    = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

module.exports = {
    async createGroup(req, res, next) {
        const retBody = {
            success: {
                status: "201",
                resultMsg: "그룹 생성 성공",
                result: {},
            },
            fail: {
                notExistUser: {
                    status: "400",
                    resultMsg: "멤버 중 존재하지 않는 회원이 있음",
                    result: {},
                },
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        };

        const title     = req.body.title;
        const members   = req.body.members;
        const uid       = req.body.uid;

        let memberUids = [];
        try {
            let memberUser = null;
            for(let member of members) {
                memberUser = await db.user.findOne({
                    where: {
                        id: member,
                    },
                    raw: true,
                });

                // 사용자가 자기 자신을 그룹 멤버로 입력했을 경우
                // 뒤에서 사용자 본인을 그룹 멤버로 넣는 코드가 있으므로 여기서는 continue
                if(memberUser.uid === uid)
                    continue;

                // 사용자가 입력한 멤버가 존재하지 않는 멤버일 경우
                if(!memberUser)
                    return res.status(400).json(retBody.fail.notExistUser);
                
                memberUids.push(memberUser.uid);
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }


        // 그룹 생성 및 user_group 정보 생성
        try {

            await db.sequelize.transaction(async (t) => {
                const createdGroup = await db.group.create({
                    title,
                }, { transaction: t, raw: true });

                memberUids.push(uid);   // 그룹 생성 요청한 유저도 생성된 그룹에 포함
                for(let muid of memberUids) {
                    await db.user_group.create({
                        gid: createdGroup.gid,
                        uid: muid,
                    }, { transaction: t });
                }
            });

            res.status(201).json(retBody.success);
        } catch(error) {
            console.log(error);
            res.status(500).json(retBody.fail.serverError);
        }
    },

    async inquiryGroup(req, res, next) {
        const retBody = {
            success: {
                status: "200",
                resultMsg: "그룹 정보 조회 성공",
                result: {},
            },
            fail: {
                invalidGroupId: {
                    status: "400",
                    resultMsg: "존재하지 않는 그룹 번호",
                    result: {},
                },
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        };

        const uid = req.body.uid;
        const gid = req.params.gid;


        // 그룹명, 그룹에 속한 회원명 추출
        let groupUsersInfo = [];
        try {
            const sql = `SELECT id, image_url, title, ug.gid, ug.uid FROM user_group AS ug JOIN \`group\` AS g ON ug.gid = g.gid JOIN user AS u ON ug.uid = u.uid WHERE ug.gid = ${gid};`
            groupUsersInfo = await db.sequelize.query(sql, {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }


        // 그룹에 공유된 테스트 정보 추출
        // 테스트 정보 : tid, title, correct_count, question_count
        let groupTestsInfo = [];
        try {
            const sql = `SELECT * FROM user_group_test GROUP BY gid, uid, tid HAVING gid=${gid} and uid=${uid};`;
            groupTestsInfo = await db.sequelize.query(sql, {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }

        // 그룹에 공유된 테스트 아이디 추출
        const tids = [];
        for(let test of groupTestsInfo)
            tids.push(test.tid);


        // 현재 회원의 그룹에 공유된 테스트 현황 추출
        let testsInfo = [];
        try {
            for(let tid of tids) {
                const testInfo = await db.test.findOne({
                    where: {
                        uid,
                        tid,
                    },
                    raw: true,
                });

                testsInfo.push(testInfo);
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }

        
        retBody.success.result = {
            members: groupUsersInfo,
            tests: testsInfo,
        }
        res.status(200).json(retBody.success);
    },
     
    async startGroupTest(req, res, next) {

        const retBody = {
            success: {
                status: "200",
                resultMsg: "그룹 정보 조회 성공",
                result: {},
            },
            fail: {
                notAuthorizedUser: {
                    status: "403",
                    resultMsg: "접근 권한 없음",
                    result: {},
                },
                noQnas: {
                    status: "404",
                    resultMsg: "공유된 문제 없음",
                    result: {},
                },
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        };

        const gid = req.params.gid;
        const tid = req.params.tid;
        const uid = req.body.uid;

        // 해당 그룹에 속한 회원인지 검증
        let isAuthorized = null;
        try {
            isAuthorized = await db.user_group.findOne({
                where: {
                    gid,
                    uid,
                }
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }

        if(!isAuthorized)
            return res.status(403).json(retBody.fail.notAuthorizedUser);

        
        // tid, uid로 질문 - 답변 추출
        let qnas = [];
        try {
            qnas = await db.question_answer.findAll({
                where: {
                    uid,
                    tid,
                },
                raw: true,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }


        if(qnas.length === 0)
            return res.status(404).json(retBody.fail.noQnas);

        retBody.success.result.qnas = qnas;
        res.status(200).json(retBody.success);
    },

    async scoreGroupTest(req, res, next) {

        const retBody = {
            success: {
                status: "200",
                resultMsg: "그룹 정보 조회 성공",
                result: {},
            },
            fail: {
                notAuthorizedUser: {
                    status: "403",
                    resultMsg: "접근 권한 없음",
                    result: {},
                },
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        };

        const qnas  = req.body.qnas;
        const uid   = req.body.uid;
        const gid   = req.params.gid;
        const tid   = req.params.tid;

        // 해당 그룹에 공유된 테스트를 본 회원인지 검증
        let isAuthorized = null;
        try {
            isAuthorized = await db.user_group_test.findOne({
                where: {
                    gid,
                    tid,
                    uid,
                },
                raw: true,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }

        if(!isAuthorized)
            return res.status(403).json(retBody.fail.notAuthorizedUser);


        // 프론트가 준 qid 배열을 토대로 정답 추출
        let answers = [];
        try {
            for(let qna of qnas) {
                const qid = qna.qid;
                const answerRecord = await db.question_answer.findOne({
                    where: {
                        qid,
                    },
                    raw: true,
                });

                if(!answerRecord)
                    throw new Error();

                answers.push(answerRecord.answer);
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }

        
        // 채점 결과
        let scoringResults = {};
        let correctCount = 0;
        for(let i=0; i<qnas.length; ++i) {
            if(qnas[i].answer === answers[i]) {
                correctCount += 1;
                scoringResults[qnas[i].qid] = 1;
            } else
                scoringResults[qnas[i].qid] = 0;
        }

        console.log(scoringResults);


        // 테스트 테이블 업데이트
        let updatedTestRecord = null;
        console.log(db.Sequelize.NOW);
        try {
            await db.test.update({
                correct_count: correctCount,
                examed_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            }, {
                where: {
                    tid,
                    uid,
                },
            });

            updatedTestRecord = await db.test.findOne({
                where: {
                    tid,
                    uid,
                },
                raw: true,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }


        // 질문-답변 테이블 업데이트
        let wrongQnas = [];
        try {
            const qids = Object.keys(scoringResults);
            const result = Object.values(scoringResults); 
            for(let i=0; i<qids.length; ++i) {
                await db.question_answer.update({
                    is_correct: result[i],
                }, {
                    where: {
                        qid: qids[i]
                    },
                    returning: true,
                });

                // 틀린 문제는 프론트에 반환해야함
                if(result[i] === 0) {
                    const qna = await db.question_answer.findOne({
                        where: {
                            qid: qids[i],
                        },
                        raw: true,
                    });
                    wrongQnas.push(qna);
                }
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }

        retBody.success.result.test = updatedTestRecord;
        retBody.success.result.qnas = wrongQnas;
        res.status(200).json(retBody.success);
    },
};