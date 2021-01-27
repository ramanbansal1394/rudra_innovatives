const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true, lowercase: true },
    password: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", schema);

module.exports = user;
