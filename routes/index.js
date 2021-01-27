"use strict";
const user = require("./user");
const upload = require("./upload");
const auth = require("./auth");

module.exports = (app) => {
  try {
    app.use("/user", user);
    app.use("/upload", upload);
    app.use("/auth", auth);
  } catch (err) {
    console.log("routes", err);
  }
};
