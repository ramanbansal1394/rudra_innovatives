"use strict";
const express = require("express");
const router = express.Router();
const ctr = require("../controllers/auth"); // auth controller
const validations = require("../validations");

router.post("/login", validations.login, ctr.login);

module.exports = router;
