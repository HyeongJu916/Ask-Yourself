const express           = require('express');
const router            = express.Router();
const sessionController   = require("../controllers/sessionController");


router.post("/", sessionController.login);

router.delete("/", sessionController.logout);

module.exports = router;