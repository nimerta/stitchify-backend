const express = require("express");

const router = express.Router();

const designControllers = require("../controllers/Designs");

router.post("/upload-design", designControllers.uploadDesign);

module.exports = router;
