const express           = require('express');
const router            = express.Router();
const usersController   = require("../controllers/usersController");
// const auth              = require("../middlewares/auth");


router.post('/groups',usersController.getGroups);

router.post('/', usersController.registrateUser);

// 유저 정보 조회
router.get("/:uid/profile", usersController.inquiryUser);

router.get("/:uid/group", usersController.getUserGroups);

<<<<<<< HEAD
router.post("/groups", usersController.getGroups);
=======
>>>>>>> 15574e08720468b19ac03445ca59b6eda30e79c3

module.exports = router;
