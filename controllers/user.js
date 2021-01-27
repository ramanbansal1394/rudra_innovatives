const { validationResult } = require("express-validator");
const userHandler = require("../db-handlers/user");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const responses = require("../common/responses");

/**
 * @method registration: This method used to create booking
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.registration = async (req, res) => {
  try {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 400, message: errors.array() });
    }
    const user = await userHandler.find({ email });
    if (user) {
      return res.json({
        status: 400,
        message: "Email already used.",
      });
    }
    const newUser = await userHandler.create({ ...req.body });
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
    console.log("registration", err);
    return res.json(responses.failedError);
  }
};

/**
 * @method getUser: This method to get user detail
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        status: 400,
        message: "User ID is required.",
      });
    }
    const user = await userHandler.find({ _id: ObjectID(id) });
    if (user) {
      return res.json({
        status: 200,
        message: "User detail fetch successfully.",
        data: { user },
      });
    } else {
      return res.json({
        status: 400,
        message: "Wrong User ID.",
      });
    }
  } catch (err) {
    console.log("getUser", err);
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
    const { id } = req.params;
    if (!id) {
      return res.json({
        status: 400,
        message: "User ID is required.",
      });
    }
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
    console.log("deleteUser", err);
    return res.json(responses.failedError);
  }
};

/**
 * @method allUsers: This method to get all users
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.allUsers = async (req, res) => {
  try {
    const users = await userHandler.findMany();
    if (users) {
      return res.json({
        status: 200,
        message: "Users fetch successfully.",
        data: { users },
      });
    } else {
      return res.json({
        status: 400,
        message: "Don't have any user.",
      });
    }
  } catch (err) {
    console.log("allUsers", err);
    return res.json(responses.failedError);
  }
};
