const express           = require('express');
const router            = express.Router();
const testController   = require("../controller/testController");
const auth              = require("../middlewares/auth");
const Multer=require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
});


router.post('/add-test',auth.authenticateUser,multer.single('file'),testController.addTest);
router.get('/info',auth.authenticateUser,testController.getInfo);
router.get('/all',auth.authenticateUser,testController.getTest);
router.post('/renew-test',auth.authenticateUser,testController.renewTest);
router.get('/:tid',auth.authenticateUser,testController.testShow);
module.exports = router;
