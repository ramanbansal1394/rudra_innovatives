const { validationResult } = require("express-validator");
const userHandler = require("../db-handlers/user");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const responses = require("../common/responses");
const bcrypt = require('../common/password');

/**
 * @method login: This method used to login
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: 400, message: errors.array() });
        }
        const user = await userHandler.find({ username });
        if (user) {
            const isMatched = await bcrypt.decryption({ hash: user.password, password });
            if (isMatched) {
                return res.json({
                    status: 200,
                    message: "Login successfully.",
                    data: { user }
                });
            } else {
                return res.json({
                    status: 400,
                    message: "Invalid credentials.",
                });
            }
        } else {
            return res.json({
                status: 400,
                message: "Invalid credentials.",
            });
        }
    } catch (err) {
        console.log("login", err);
        return res.json(responses.failedError);
    }
};

/**
 * @method changePassword: This method used to change password
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: 400, message: errors.array() });
        }
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const cond = { _id: ObjectID(id) };
        const user = await userHandler.find(cond);
        if (user) {
            const isMatched = await bcrypt.decryption({ hash: user.password, password: oldPassword });
            if (!isMatched) {
                return res.json({
                    status: 400,
                    message: "Wrong old password.",
                });
            }
            const hash = await bcrypt.bcryption(newPassword);
            const isUpdated = await userHandler.update({ cond, obj: { password: hash } });
            if (isUpdated) {
                return res.json({
                    status: 200,
                    message: "Password changed successfully.",
                });
            } else {
                return res.json({
                    status: 400,
                    message: "Wrong ID.",
                });
            }
        } else {
            return res.json({
                status: 400,
                message: "Wrong ID.",
            });
        }
    } catch (err) {
        console.log("changePassword-err", err);
        return res.json(responses.failedError);
    }
};
