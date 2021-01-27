"use strict";
const express = require("express");
const router = express.Router();
const ctr = require("../controllers/auth"); // auth controller
const validations = require("../validations");

router.post("/login", validations.login, ctr.login);
router.post("/change-password/:id", validations.changePassword, ctr.changePassword);

module.exports = router;
