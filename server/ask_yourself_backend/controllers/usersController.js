const { createHash }    = require("../modules/create-secret");
const db                = require("../models");

// TODO 로그아웃
module.exports = {
    async registrateUser(req, res, next) {
        const retBody = {
            success: {
                status: "201",
                resultMsg: "회원 가입 성공",
                result: {},
            },
            fail: {
                alreadyExistUser: {
                    status: "404",
                    resultMsg: "이미 존재하는 회원",
                    result: {},
                },
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        }

        const id        = req.body.id;
        const password  = req.body.password;
        const imageUrl  = req.body.imageUrl;
        const hashedPassword = createHash(password);

        // 이미 존재하는 회원인지 검사
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

        if(currentUser)
            return res.status(404).json(retBody.fail.alreadyExistUser);


        // 회원 정보 저장
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
                status: "200",
                resultMsg: "유저 정보 조회 성공",
                result: {},
            },
            fail: {
                invalidParams: {
                    status: "400",
                    resultMsg: "유효하지 않은 아이디 혹은 비밀번호",
                    result: {},
                },
                unauthorizedUser: {
                    status: "403",
                    resultMsg: "조회 권한 없음",
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
        }

        const uid = req.params.uid;
        // const jwtUid = res.locals.uid;
        
        if(!uid)
            return res.status(400).json(retBody.fail.invalidParams);

        // if(jwtUid !== parseInt(uid))
        //     return res.status(403).json(retBody.fail.unauthorizedUser);

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
        let result = {
            id              : currentUser.id,
            imageUrl        : currentUser.image_url,
            solvedCount     : 0,
            unsolvedCount   : 0,
        };
        for(let test of tests) {
            if(test.correct_count === null)
                result.unsolvedCount += 1;
            else
                result.solvedCount += 1;
        }
        retBody.success.result = result;
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
                notAuthorizedUser: {
                    status: "403",
                    resultMsg: "조회 권한 없음",
                    result: {},
                },
                serverError: {
                    status: "500",
                    resultMsg: "서버 오류",
                    result: {},
                },
            },
        };

        // const jwtUid = res.locals.uid;
        const uid = req.params.uid;

        // if(jwtUid !== parseInt(uid))
        //     return res.status(403).json(retBody.fail.notAuthorizedUser);

        // 그룹명, 그룹에 속한 회원 명단 추출
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
    async getGroups(req,res,next){
        const id=req.body.uid;
<<<<<<< HEAD
=======

        console.log('aa');
>>>>>>> 15574e08720468b19ac03445ca59b6eda30e79c3

        try{

            var groups=await db.user_group.findAll({
                raw:true,
                where:{
                    uid:id
                }
            });
            var group=[];
            for(var _ in groups){

                var ob={};
                var groupNames=await db.group.findOne({
                    raw:true,
                    where:{
                        gid:groups[_].gid
                    }
                })
                ob.gid=groups[_].gid;
                ob.groupName=groupNames['title'];
                group.push(ob);
            }
            
            return res.json({
                resultMsg:"그룹 조회성공",
                result:group,
                status:200
            })



        }
        catch{
            console.log(error);
            res.status(500).json({
                suceess:false,
                resultMsg:{}
            });
        }
    }
}
