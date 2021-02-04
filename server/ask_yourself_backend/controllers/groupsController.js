const db = require("../models");

module.exports = {
    async createGroup(req, res, next) {
        const retBody = {
            success: {
                resultCode: "201",
                resultMsg: "그룹 생성 성공",
                item: {},
            },
            fail: {
                notExistUser: {
                    resultCode: "400",
                    resultMsg: "멤버 중 존재하지 않는 회원이 있음",
                    item: {},
                },
                serverError: {
                    resultCode: "500",
                    resultMsg: "서버 오류",
                    item: {},
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
};