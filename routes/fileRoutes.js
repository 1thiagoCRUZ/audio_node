const multer = require("multer");
const { Router } = require("express");
const { uploadFile } = require("../controllers/fileController");

const storage = multer.memoryStorage();


const upload = multer({ storage }).any();

const router = Router();

router.post("/v1/uploadFile", upload, uploadFile);

module.exports = router;
