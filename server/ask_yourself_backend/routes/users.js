const express           = require('express');
const router            = express.Router();
const usersController   = require("../controllers/usersController");
// const auth              = require("../middlewares/auth");


router.post('/groups',usersController.getGroups);

router.post('/', usersController.registrateUser);

// 유저 정보 조회
router.get("/:uid/profile", usersController.inquiryUser);

router.get("/:uid/group", usersController.getUserGroups);

router.post("/groups", usersController.getGroups);

module.exports = router;
