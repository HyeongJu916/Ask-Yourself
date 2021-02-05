const express           = require('express');
const router            = express.Router();
const usersController   = require("../controller/usersController");
const auth              = require("../middlewares/auth");
const Multer=require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
});

// 회원 가입
router.post('/',multer.single('file'), usersController.registrateUser);

// 유저 정보 조회
router.get("/:uid/profile", auth.authenticateUser, usersController.inquiryUser);

router.get("/:uid/group", auth.authenticateUser, usersController.getUserGroups);

module.exports = router;
