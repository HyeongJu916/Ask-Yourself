const express           = require('express');
const router            = express.Router();
const sessionController   = require("../controller/sessionController");


router.post("/", sessionController.login);

router.delete("/", sessionController.logout);

module.exports = router;