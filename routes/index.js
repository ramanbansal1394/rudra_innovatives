"use strict";
const user = require("./user");
const auth = require("./auth");

module.exports = (app) => {
  try {
    app.use("/user", user);
    app.use("/auth", auth);
  } catch (err) {
    console.log("routes-err", err);
  }
};
