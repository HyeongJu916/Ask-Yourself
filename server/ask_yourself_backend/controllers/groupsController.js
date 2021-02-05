const db = require("../models");

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
        const uid       = res.locals.uid;

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
                resultMsg: "그룹 상세 정보 조회 성공",
                result: {},
            },
            fail: {
                invalidGroupId: {
                    status: "400",
                    resultMsg: "존재하지 않는 그룹 번호",
                    result: {},
                },
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

        const uid = res.locals.uid;
        const gid = req.params.gid;

        // 요청한 유저가 해당 그룹에 접근 권한이 있는지 확인
        let isUserAuthorized = null;
        try {
            isUserAuthorized = await db.user_group.findOne({
                where: {
                    uid,
                    gid,
                } 
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }

        if(!isUserAuthorized)
            return res.status(403).json(retBody.fail.notAuthorizedUser);


        // 그룹명, 그룹에 속한 회원명 추출
        let groupUsersInfo = [];
        try {
            const sql = `SELECT id, image_url, title FROM user_group AS ug JOIN \`group\` AS g ON ug.gid = g.gid JOIN user AS u ON ug.uid = u.uid WHERE ug.gid = ${gid};`
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

        retBody.success.result = {
            members: groupUsersInfo,
            tests: groupTestsInfo,
        }

        res.status(200).json(retBody.success);
    },

    async inquiryGroupTest(req, res, next) {
        const retBody = {
            success: {
                status: "200",
                resultMsg: "그룹 테스트 조회 성공",
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

        const gid = req.params.gid;
        const tid = req.params.tid;
        const uid = res.locals.uid;

        // 그룹 접근 권한 있는지 확인
        try {
            await db.user_group.findOne({
                where: {
                    gid,
                    uid,
                },
            });
        } catch(error) {
            console.log(error);
            return res.status(403).json(retBody.fail.notAuthorizedUser);
        }


        // 테스트 자세한 정보 추출
        let qnas = [];
        try {
            qnas = await db.question_answer.findAll({
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

        retBody.success.result.qnas = qnas;
        res.status(200).json(retBody.success);
    },

    async scoreGroupTest(req, res, body) {

    }
};