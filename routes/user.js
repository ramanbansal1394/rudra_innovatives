"use strict";
const express = require("express");
const router = express.Router();
const ctr = require("../controllers/user"); // user controller
const validations = require("../validations");

router.post("/registration", validations.registration, ctr.registration);
router.post("/edit/:id", validations.updateUser, ctr.updateUser);
router.post("/delete/:id", validations.deleteUser, ctr.deleteUser);
router.get("/forgot-password/:email", validations.forgotPassword, ctr.forgotPassword);

module.exports = router;
