const express = require("express");
const router = express.Router();
const { generateImage } = require("../controllers/openai");

router.post("/generateimage", generateImage);

module.exports = router;
