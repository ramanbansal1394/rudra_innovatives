"use strict";
const express = require("express");
const router = express.Router();
const ctr = require("../controllers/user"); // user controller
const validations = require("../validations");

router.post("/registration", validations.registration, ctr.registration);
router.get("/detail/:id", ctr.getUser);
router.get("/all", ctr.allUsers);
router.get("/delete/:id", ctr.deleteUser);

module.exports = router;
