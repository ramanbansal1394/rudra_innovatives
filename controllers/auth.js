const { validationResult } = require("express-validator");
const userHandler = require("../db-handlers/user");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const responses = require("../common/responses");
const { getToken } = require('../middleware');

/**
 * @method login: This method used to login
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: 400, message: errors.array() });
        }
        const user = await userHandler.find({ email, password });
        if (user) {
            const auth_token = getToken(user._id);
            const updated = await userHandler.update({ cond: { _id: ObjectID(user._id) }, obj: { auth_token } });
            return res.json({
                status: 200,
                message: "Login successfully.",
                data: { user: { ...user, auth_token } }
            });
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
