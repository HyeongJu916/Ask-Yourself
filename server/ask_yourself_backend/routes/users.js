const express           = require('express');
const router            = express.Router();
const usersController   = require("../controllers/usersController");
const auth              = require("../middlewares/auth");

// 회원 가입
router.post('/', usersController.registrateUser);

// 유저 정보 조회
router.get("/:uid/profile", auth.authenticateUser, usersController.inquiryUser);

router.get("/:uid/group", auth.authenticateUser, usersController.getUserGroups);

module.exports = router;
