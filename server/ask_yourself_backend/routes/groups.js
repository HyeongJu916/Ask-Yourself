const express           = require("express");
const router            = express.Router();
const groupsController  = require("../controllers/groupsController");

router.post("/", groupsController.createGroup);

router.post("/:gid/tests/:tid/result", groupsController.scoreGroupTest);

router.post("/:gid/tests/:tid", groupsController.startGroupTest);

router.post("/:gid", groupsController.inquiryGroup);

module.exports = router;