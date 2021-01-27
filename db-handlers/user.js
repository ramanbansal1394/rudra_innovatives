"use strict";
const User = require("../models/user");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

/**
 * @method find: A method use to find user account
 * @param {Object} cond matching fields from previous/parent api method
 */
const find = async (cond) => {
  let user = false;
  try {
    await User.findOne(cond)
      .then((res) => {
        if (res) user = JSON.parse(JSON.stringify(res));
      })
      .catch((err) => {
        console.log("find-user", err);
      });
    return user;
  } catch (err) {
    console.log("find-user-err", err);
    return user;
  }
};

/**
 * @method userDelete: A method use to delete user account
 * @param {Object} obj user id from previous/parent api method
 */
const userDelete = async (id) => {
  let result = false;
  try {
    await User.deleteOne({ _id: ObjectID(id) })
      .then((res) => {
        if (res && res.deletedCount) {
          result = true;
        }
      })
      .catch((err) => {
        console.log(`userDelete-err`, err);
      });
    return result;
  } catch (err) {
    console.log(`userDelete-err`, err);
    return result;
  }
};

/**
 * @method create: A method to create user account
 * @param {Object} data user account detail from previous/parent api method
 */
const create = async (data) => {
  let user = false;
  try {
    await new User(data)
      .save()
      .then((res) => {
        if (res) {
          user = JSON.parse(JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log("create-user", err);
      });
    return user;
  } catch (err) {
    console.log("create-user-err", err);
    return user;
  }
};

/**
 * @method update: A method to update user account
 * @param {Object} data user account detail from previous/parent api method
 */
const update = async (data) => {
  const { cond, obj } = data;
  let user = false;
  try {
    await User.updateOne(cond, { $set: obj })
      .then((res) => {
        if (res && res.nModified) {
          user = true;
        }
      })
      .catch((err) => {
        console.log("update-user", err);
      });
    return user;
  } catch (err) {
    console.log("update-user-err", err);
    return user;
  }
};

module.exports = {
  find,
  userDelete,
  create,
  update
};
