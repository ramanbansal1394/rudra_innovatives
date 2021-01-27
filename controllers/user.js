const { validationResult } = require("express-validator");
const userHandler = require("../db-handlers/user");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const responses = require("../common/responses");
const sendEmail = require("../common/sendEmail").sendEmail;
const generator = require('generate-password');
const bcrypt = require('../common/password');

/**
 * @method registration: This method used to create booking
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 400, message: errors.array() });
    }
    const user = await userHandler.find({ $or: [{ username }, { email }] });
    if (user) {
      if (user.username === username) {
        return res.json({
          status: 400,
          message: "Username already taken.",
        });
      } else if (user.email === email) {
        return res.json({
          status: 400,
          message: "Email already used.",
        });
      }
    }
    const newUser = await userHandler.create({ username, email, password: await bcrypt.bcryption(password) });
    if (newUser) {
      return res.json({
        status: 200,
        message: "User registered successfully.",
        data: newUser ? { user: newUser } : null,
      });
    } else {
      return res.json(responses.failedError);
    }
  } catch (err) {
    console.log("registration-err", err);
    return res.json(responses.failedError);
  }
};

/**
 * @method updateUser: This method to update user detail
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 400, message: errors.array() });
    }

    const { id } = req.params;
    const { username, email } = req.body;
    const user = await userHandler.find({ $and: [{ _id: { $ne: ObjectID(id) } }, { $or: [{ username }, { email }] }] });
    if (!user) {
      const isUpdated = await userHandler.update({ cond: { _id: ObjectID(id) }, obj: { username, email } });
      console.log("isUpdated", isUpdated);
      if (isUpdated) {
        return res.json({
          status: 200,
          message: "User update successfully.",
        });
      } else {
        return res.json({
          status: 400,
          message: "Wrong User ID.",
        });
      }
    }
    if (user.username === username.trim().toLowerCase()) {
      return res.json({
        status: 400,
        message: "Username already taken.",
      });
    } else if (user.email === email.trim().toLowerCase()) {
      return res.json({
        status: 400,
        message: "Email already used.",
      });
    }
  } catch (err) {
    console.log("updateUser-err", err);
    return res.json(responses.failedError);
  }
};

/**
 * @method deleteUser: This method to delete user account
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.deleteUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 400, message: errors.array() });
    }

    const { id } = req.params;
    const user = await userHandler.userDelete(id);
    if (user) {
      return res.json({
        status: 200,
        message: "Delete user account successfully.",
      });
    } else {
      return res.json({
        status: 400,
        message: "Wrong User ID.",
      });
    }
  } catch (err) {
    console.log("deleteUser-err", err);
    return res.json(responses.failedError);
  }
};

/**
 * @method forgotPassword: This method to send link through email for reset password
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userHandler.find({ email });
    if (user) {
      const password = generator.generate({
        length: 7,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        strict: true,
      });
      const hash = await bcrypt.bcryption(password);
      await userHandler.update({ cond: { email }, obj: { password: hash } });
      const isSent = await sendEmail({
        to: user.email, subject: "Forgot Password",
        html: `<strong>Please find following your new password: </strong>
        <br/>
        <br/>
        Password: <strong>${password}</strong>`
      })
      if (isSent) {
        return res.json({
          status: 200,
          message: "Sent email successfully.",
        });
      } else {
        return res.json(responses.failedError);
      }

    } else {
      return res.json({
        status: 400,
        message: "Don't have any user.",
      });
    }
  } catch (err) {
    console.log("forgotPassword-err", err);
    return res.json(responses.failedError);
  }
};
