const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    profile_pic: String,
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    // to execute the api's using this token, token will be create at time of login
    auth_token: {
      type: String,
      trim: true,
    },
    address: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", schema);

module.exports = user;
