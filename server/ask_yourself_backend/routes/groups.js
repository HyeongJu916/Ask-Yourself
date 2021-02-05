const express           = require("express");
const router            = express.Router();
const groupsController  = require("../controllers/groupsController");

router.post("/", groupsController.createGroup);

router.get("/:gid", groupsController.inquiryGroup);

// router.get("/:gid/tests/:tid", groupsController.inquiryGroupTest)

module.exports = router;