const express           = require("express");
const router            = express.Router();
const groupsController  = require("../controllers/groupsController");

router.post("/", groupsController.createGroup);

module.exports = router;