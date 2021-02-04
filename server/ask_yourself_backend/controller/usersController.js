const { createHash }    = require("../modules/create-secret");
const db                = require("../models");

// TODO 로그아웃
module.exports = {
    async registrateUser(req, res, next) {
        const retBody = {
            success: {
                resultCode: "201",
                resultMsg: "회원 가입 성공",
                item: {},
            },
            fail: {
                serverError: {
                    resultCode: "500",
                    resultMsg: "서버 오류",
                    item: {},
                },
            },
        }

        const id        = req.body.id;
        const password  = req.body.password;
        const imageUrl  = req.body.imageUrl;
        const hashedPassword = createHash(password);

        try {
            await db.user.create({
                id, 
                password : hashedPassword,
                image_url: imageUrl,
            });
            res.status(200).json(retBody.success);
        } catch(error) {
            console.log(error);
            res.status(500).json(retBody.fail.serverError);
        }
    },

    async inquiryUser(req, res, next) {
        
        const retBody = {
            success: {
                resultCode: "200",
                resultMsg: "유저 정보 조회 성공",
                item: {},
            },
            fail: {
                invalidParams: {
                    resultCode: "400",
                    resultMsg: "유효하지 않은 아이디 혹은 비밀번호",
                    item: {},
                },
                unauthorizedUser: {
                    resultCode: "403",
                    resultMsg: "조회 권한 없음",
                    item: {},
                },
                notExistUser: {
                    resultCode: "404",
                    resultMsg: "존재하지 않는 회원",
                    item: {},
                },
                serverError: {
                    resultCode: "500",
                    resultMsg: "서버 오류",
                    item: {},
                },
            },
        }

        const uid = req.params.uid;
        const jwtUid = res.locals.uid;
        
        if(!uid)
            return res.status(400).json(retBody.fail.invalidParams);

        if(jwtUid !== uid)
            return res.status(403).json(retBody.fail.unauthorizedUser);

        let currentUser = null;
        try {
            currentUser = await db.user.findOne({ where: { uid } });
        } catch(error) {
            return res.status(500).json(retBody.fail.serverError);
        }

        // 찾는 회원이 없을 때
        if(!currentUser)
            return res.status(404).json(retBody.fail.notExistUser);

        // 찾는 회원이 있다면 테스트 테이블 조회
        let tests = [];
        try {
            tests = await db.test.findAll({
                where: {
                    uid
                }, 
                raw: true,
            });
        } catch(error) {
            return res.status(500).json(retBody.fail.serverError);
        }


        // 프론트에 전달할 데이터 목록
        let item = {
            id              : currentUser.id,
            imageUrl        : currentUser.image_url,
            solvedCount     : 0,
            unsolvedCount   : 0,
        };
        for(let test of tests) {
            if(test.correct_count === null)
                item.unsolvedCount += 1;
            else
                item.solvedCount += 1;
        }
        retBody.success.item = item;
        res.status(200).json(retBody.success);
    },
}
