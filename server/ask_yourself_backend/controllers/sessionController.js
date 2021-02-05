const { createHash }    = require("../modules/create-secret");
const jwt               = require("../modules/jwt");
const db                = require("../models");

module.exports = {
    async login(req, res, next) {
        const retBody = {
            success: {
                status: "201",
                resultMsg: "로그인 성공",
                result: {},
            },
            fail: {
                invalidParams: {
                    status: "400",
                    resultMsg: "유효하지 않은 아이디 혹은 비밀번호",
                    result: {},
                },
                notExistUser: {
                    status: "404",
                    resultMsg: "존재하지 않는 회원",
                    result: {},
                },
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        };

        const id                = req.body.id;
        const password          = req.body.password;
        const hashedPassword    = createHash(password);

        let currentUser = null;
        try {
            currentUser = await db.user.findOne({
                where: {
                    id,
                    password: hashedPassword,
                }
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json(retBody.fail.serverError);
        }


        if(!currentUser)
            return res.status(404).json(retBody.fail.notExistUser);
      
            
        const createdJWT = jwt.createJWT(currentUser.uid, currentUser.id);

        retBody.success.result.jwt = createdJWT;
        res.status(201).json(retBody.success);
    },

    async logout(req, res, next) {

    },
};