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
        
        const id=res.locals.uid;
        if(!pic){
            return res.json({
                status:411,
                result:{},
                resultMsg:'사진을 입력해주세요'
            })
        };
        try{
        

            const test=await db.test.create({
                uid:id,
                title:testTitle
            });            
 
            const bucket =  storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
            const blob = bucket.file(''+test.tid+path.extname(req.file.originalname));
            const blobStream =blob.createWriteStream();
            
            const bucket_name=bucket['name'];
            
            const blob_name=blob['name'];

            blobStream.on("error", (err) => {
                next(err);
            });
            
            
            blobStream.on("finish", async() => {
                const publicUrl =  format(`https://storage.googleapis.com/${bucket_name}/${blob_name}`);
                const data=await Tesseract.recognize(
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
                        tid:test.tid
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
                        tid:test.tid,
                        question:questions,
                        answer:answers,
                        qid:qids
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

    async getInfo(req,res,next){
        const id=res.locals.uid;
        try{
            const user=await db.user.findOne({uid:id});
            const tests=await db.test.findAll({uid:id});
            var finishCnt=0,unfinshCnt=tests.length;
            for(var _ of tests){
                if(_.question_count==_.correct_count){
                    finishCnt=finishCnt+1;
                }
            }
            unfinshedCnt=unfinshCnt-finishCnt;
            
            return res.json({
                resultMsg:"내 정보 조회 성공",
                status:200,
                result:{
                    image_url:user.image_url,
                    finishCnt:finishCnt,
                    unfinshCnt:unfinshCnt
                }
            });

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                resultMsg:"내 정보 조회 실패",
                result:{},
                status:500
            });
        }
    },
    async getTest(req,res,next){
        const id=res.locals.uid;
        try{
            const tests=await db.test.findAll({
                where:{
                    uid:id
                }
            });
            var testss=[];
            for(var test of tests){
                var ob={};
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
        const id=res.locals.uid;
        const {item,tid}=req.body;

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

            var correct_counts=0;
            for(var _ of item){
                await db.question_answer.update({
                    is_correct:_.is_correct
                },{where:{qid:_.qid}});

                if(_.is_correct==1) correct_counts=correct_counts+1;
            }
            await db.test.update({
                correct_count:correct_counts,
                examed_at:new Date()
            },{where:{tid:tid}})


            return res.json({
                resultMsg:"테스트 수정 성공",
                result:{},
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
        const id=res.locals.uid;
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
                where:{
                    tid:tid
                }
            });
            
            for(var _ of tests){
                if(_.is_correct===null){
                    _.is_correct=0;
                }
            }


            return res.json({
                result:{
                    test:tests
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
    }
}