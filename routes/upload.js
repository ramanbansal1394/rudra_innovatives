"use strict";
const express = require("express");
const router = express.Router();
const ctr = require("../controllers/upload"); // upload controller

router.post("/profile-pic", ctr.uploadImage);

module.exports = router;
