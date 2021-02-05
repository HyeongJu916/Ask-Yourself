const { createHash }    = require("../modules/create-secret");
const db                = require("../models");
const path              = require('path');
const {Storage:GCS}     = require('@google-cloud/storage') ;
const storage           = new GCS();
const {format}          = require('util');

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
        const hashedPassword = createHash(password);

        try {

            const bucket =  storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
            const blob = bucket.file(''+id+path.extname(req.file.originalname));
            const blobStream = blob.createWriteStream();
            
            const bucket_name=bucket['name'];
            
            const blob_name=blob['name'];

            blobStream.on("error", (err) => {
                next(err);
            });
            
            
            blobStream.on("finish", async() => {
                // const publicUrl =  format(`https://storage.googleapis.com/${bucket_name}/${blob_name}`);

                await db.user.create({
                    id,
                    password : hashedPassword,
                    image_url: "https://storage.googleapis.com/evenshunshine/default.png",
                });

                res.status(200).json(retBody.success);  
            });

            blobStream.end(req.file.buffer);

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
                unAuthorizedUser: {
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

        const uid = Number(req.params.uid);
        const jwtUid = res.locals.uid;
        
        if(!uid)
            return res.status(400).json(retBody.fail.invalidParams);

        if(jwtUid !== uid)
            return res.status(403).json(retBody.fail.unAuthorizedUser);

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

    async getUserGroups(req, res, next) {
        const retBody = {
            success: {
                status: "200",
                resultMsg: "그룹 조회 성공",
                result: {},
            },
            fail: {
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        };

        const uid = res.locals.uid;

        // 그룹명, 그룹에 속한 회원 수 추출
        let groups = [];
        try {
            let sql = `SELECT g.gid, g.title FROM user_group as ug JOIN \`group\` as g ON ug.gid = g.gid WHERE uid=${uid}`;
            groups = await db.sequelize.query(sql, {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true,
            });

            for(let group of groups) {
                sql = `SELECT COUNT(*) as "userCount" FROM user_group WHERE gid=${group.gid}`;
                const userCountArr = await db.sequelize.query(sql, {
                    type: db.Sequelize.QueryTypes.SELECT,
                    raw: true,
                });
                group.userCount = userCountArr[0].userCount;
            }

            retBody.success.result.groups = groups;
            res.status(200).json(retBody.success);
        } catch(error) {
            console.log(error);
            res.status(500).json(retBody.fail.serverError);
        }
    },
}
