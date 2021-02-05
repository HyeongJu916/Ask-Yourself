const express           = require("express");
const router            = express.Router();
const groupsController  = require("../controller/groupsController");

router.post("/", groupsController.createGroup);

router.get("/:gid", groupsController.inquiryGroup);

module.exports = router;