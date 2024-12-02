const multer = require("multer"); 
const { uploadFile } = require('../controllers/fileController');


const storage = multer.memoryStorage();


const upload = multer({
    storage: storage
});

const router = require('express').Router();


router.post('/v1/uploadFile', upload.single('file'), uploadFile);  

module.exports = router;
