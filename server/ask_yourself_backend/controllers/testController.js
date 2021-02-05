const db            = require("../models");
const sequelize     = require('sequelize');
const express       = require('express');
const Multer        = require('multer');
const axios         = require('axios');
const FormData      = require('form-data');
const Tesseract     = require('tesseract.js');
const {format}      = require('util');
const {Storage:GCS} = require('@google-cloud/storage') ;
const storage       = new GCS();

const path=require('path');
const { SSL_OP_NO_TLSv1_1 } = require("constants");


module.exports={
    async addTest(req,res,next){
        
        const pic=req.file;
        const {testTitle}=req.body;
        if(!testTitle){
            return res.json({
                status:413,
                result:{},
                resultMsg:'사진 제목을 입력해주세요'
            })
        }
        
        const id=req.body.uid;
        if(!pic){
            return res.json({
                status:411,
                result:{},
                resultMsg:'사진을 입력해주세요'
            })
        };
        try{
        
            // 삽입할 가장 큰 tid 찾기
            const sql = "SELECT max(tid) as tid from test";
            const maxTid = await db.sequelize.query(sql, {
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true,
            });

            let tid = maxTid[0].tid;

            if(tid === null)
                tid = 1;
            else
                tid += 1;

            // 질문 - 답변 넣기 전 test 생성
            const test = await db.test.create({
                tid,
                uid:id,
                title:testTitle,
                own:id,
                question_count:0
            });
 
            const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
            const blob = bucket.file(''+test.tid+path.extname(req.file.originalname));
            const blobStream =blob.createWriteStream();
            
            const bucket_name=bucket['name'];
            
            const blob_name=blob['name'];

            blobStream.on("error", (err) => {
                next(err);
            });
            
            
            blobStream.on("finish", async() => {
                const publicUrl = format(`https://storage.googleapis.com/${bucket_name}/${blob_name}`);
                const data = await Tesseract.recognize(
                    publicUrl,
                    'eng'
                );

                var form2 = new FormData();
                console.log(data['data']['text']);
                form2.append("input",data['data']['text']);

                const en_text2=await axios.post('https://master-question-generation-wook-2.endpoint.ainize.ai/generate',form2,{
                    headers:{
                        ...form2.getHeaders()
                    }
                });
                const answer=en_text2['data']['answer'];
                const question=en_text2['data']['question'];
                
                var answers=[];
                var questions=[];
                var qids=[];

                for(var _ in answer){
                    const t=await db.question_answer.create({
                        question:question[_],
                        answer:answer[_],
                        tid:test.tid,
                        uid:id
                    });
                    answers.push(answer[_]);
                    questions.push(question[_]);
                    qids.push(t.qid);
                }
                test.question_count=questions.length;
                test.save();
                
                return res.json({
                    status:200,
                    resultMsg:"테스트 추가 완료",
                    result:{
                        tid,
                    }
                });
                
            });

            blobStream.end(req.file.buffer);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                resultMsg:"테스트 추가 실패",
                result:{},
                status:500
            });
        }
    },

    // async getInfo(req,res,next){
    //     const id=res.locals.uid;
    //     try{
    //         const user=await db.user.findOne({uid:id});
    //         const tests=await db.test.findAll({uid:id});
    //         var finishCnt=0,unfinshCnt=tests.length;
    //         for(var _ of tests){
    //             if(_.question_count==_.correct_count){
    //                 finishCnt=finishCnt+1;
    //             }
    //         }
    //         unfinshedCnt=unfinshCnt-finishCnt;
            
    //         return res.json({
    //             resultMsg:"내 정보 조회 성공",
    //             status:200,
    //             result:{
    //                 image_url:user.image_url,
    //                 finishCnt:finishCnt,
    //                 unfinshCnt:unfinshCnt
    //             }
    //         });

    //     }
    //     catch(error){
    //         console.log(error);
    //         return res.status(500).json({
    //             resultMsg:"내 정보 조회 실패",
    //             result:{},
    //             status:500
    //         });
    //     }
    // },

    // TODO: 만약 사용자가 푼 문제라면 맞춘문제수 / 전체문제수 정보를 주어야 한다.
    async getTest(req,res,next){
        const id=req.body.uid;
        try{
            const tests=await db.test.findAll({
                raw:true,
                where:{
                    uid:id
                }
            });

            var testss=[];
            for(var test of tests){
                var ob={};

                if(test.correct_count==test.question_count){
                    ob.finished=true;
                }
                else ob.finished=false;
                ob.totalCnt=test.question_count;
                ob.correctCnt=test.correctCnt;
                ob.tid=test.tid;
                ob.title=test.title;
                ob.createdAt=test.createdAt;
                testss.push(ob);
            }

            return res.json({
                resultMsg:"테스트 조회성공",
                status:200,
                result:{
                    test:testss
                }
            })

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                resultMsg:"테스트 조회 실패",
                status:500,
                result:{}
            });
        }
    },

    async renewTest(req,res,next){
        const id=req.body.uid;
        var {item,tid}=req.body;

        if(!item){
            return res.json({
                status:422,
                resultMsg:"질문아이디와 틀린유무(0,1)을 배열로 입력해주세요",
                result:{}
            });
        }
        if(!tid){
            return res.json({
                status:421,
                resultMsg:"테스트아이디를 입력해주세요",
                result:{}
            });
        }


        try{
            
            var q_a=await db.question_answer.findAll({
                raw:true,
                where:{
                    tid:tid,
                    uid:id
                },
                order:[
                    ['qid','ASC']
                ]
            });
            
            await item.sort((a,b)=>{
                return a.qid-b.qid;
            });

            var wrong_q_a=[];
            var total_cnt=q_a.length,ans_cnt=0;
           
          
            var idx1=0;

            for(var _=0; _<q_a.length;_++){
                var ob={};
                var is_correct=0;
                if(idx1<item.length){
                    if(q_a[_].qid==item[idx1].qid){

                        if(q_a[_].answer==item[idx1].answer){
                            ans_cnt+=1;
                            is_correct=1;
                        }
                        else{
                            ob.qid=q_a[_].qid;
                            ob.answer=q_a[_].answer;
                            wrong_q_a.push(ob);
                        }
                        idx1+=1;
                    }
                    else{
                        ob.qid=q_a[_].qid;
                        ob.answer=q_a[_].answer;
                        wrong_q_a.push(ob);
                    }
                }
                await db.question_answer.update({
                    is_correct:is_correct
                },{
                    where:{
                        qid:q_a[_].qid,
                        uid:id
                    }
                })
            
            }
            
            

            await db.test.update({
                correct_count:ans_cnt,
                examed_at:new Date()
            },{where:{
                tid:tid,
                uid:id
            }});

            var testss=await db.test.findOne({
                raw:true,
                where:{
                    tid:tid,
                    uid:id
                }
            });
            

            return res.json({
                resultMsg:"테스트 수정 성공",
                result:{
                    testTitle:testss.testTitle,
                    testCreatedAt:testss.createdAt,
                    testExamedAt:testss.examed_at,
                    ansRatio:ans_cnt/total_cnt,
                    wrongList:wrong_q_a
                },
                status:200
            })

        }
        catch(error){
            console.log(error);
            res.status(500).json({
                resultMsg:"테스트 수정실패",
                status:500,
                result:{}
            });
        }
    },
    async testShow(req,res,next){
        const id=req.body.uid;
        const tid=Number(req.params.tid);

        if(!tid){
            return res.json({
                status:421,
                resultMsg:"테스트아이디를 입력해주세요",
                result:{}
            });
        }


        try{

            const tests=await db.question_answer.findAll({
                raw:true,
                where:{
                    tid:tid
                }
            });
            
            var testss=[];
            for(var _ of tests){
                var ob={};
                ob.qid=_['qid'];
                ob.question=_['question'];
                testss.push(ob);
            }


            return res.json({
                result:{
                    test:testss
                },
                resultMsg:"테스트 조회성공",
                status:200
            })

        }
        catch(error){
            console.log(error);
            res.status(500).json({
                result:{},
                resultMsg:"테스트 조회 실패",
                status:500
            });
        }
    },
    async testShare(req,res,next){
        const id=req.body.uid;
        const {tid,gid}=req.body;
        console.log('aa');
        if(!tid){
            return res.json({
                status:421,
                resultMsg:"테스트아이디를 입력해주세요",
                result:{}
            });
        }
        if(!gid){
            return res.json({
                status:421,
                resultMsg:"그룹아이디를 입력해주세요",
                result:{}
            });
        }


        try{

            var groups=await db.user_group.findAll({
                raw:true,
                where:{
                    gid:gid
                }
            });

            for(var _ in groups){
                const ex=await db.user_group_test.findOne({
                    raw:true,
                    where:{
                        uid:id,
                        gid:gid,
                        tid:tid
                    }
                });
                if(ex) continue;

                if(groups[_]['uid']==id){
                    await db.user_group_test.create({
                        uid:id,
                        gid:gid,
                        tid:tid,
                        who_share:1
                    });
                }
                else{
                    await db.user_group_test.create({
                        uid:id,
                        gid:gid,
                        tid:tid,
                        who_share:0
                    });
                }
            }
            return res.json({
                result:{
                },
                resultMsg:"테스트 공유성공",
                status:200
            })



        }
        catch(error){
            console.log(error);
            res.status(500).json({
                result:{},
                resultMsg:"테스트 공유 실패",
                status:500
            });

        }
    }

}