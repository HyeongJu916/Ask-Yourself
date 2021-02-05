const express           = require('express');
const router            = express.Router();
const testController    = require("../controllers/testController");
const Multer            = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
});

router.post('/add-test', multer.single('file'), testController.addTest);
// router.get('/info',auth.authenticateUser,testController.getInfo);
router.get('/all', testController.getTest);
router.post('/renew-test', testController.renewTest);
router.get('/:tid', testController.testShow);
router.post('share',testController.testShare);
module.exports = router;
