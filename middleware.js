const jwt = require("jsonwebtoken");
require("dotenv").config();
const userHandler = require("./db-handlers/user");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const responses = require("./common/responses");

const publicPathList = ["/user/registration", '/auth/login'];

const isPublicPath = (url) => {
  try {
    return publicPathList.includes(url);
  } catch (error) {
    console.log("isPublicPath-error", error);
  }
};

const middleware = async (req, res, next) => {
  try {
    const { headers, originalUrl } = req;
    if (isPublicPath(originalUrl)) return next();
    const bearerToken = headers["authorization"];
    if (bearerToken) {
      const isBearerToken = bearerToken.startsWith("Bearer");
      if (isBearerToken) {
        const token = bearerToken.slice(7);
        if (token) {
          const isValid = await verifyToken(token);
          if (isValid) {
            const user = await userHandler.find({ _id: ObjectID(isValid.id) });
            if (user && user.auth_token === token) {
              req.user = user;
              return next();
            }
          }
        }
      }
    }
    return res.json(responses.authFailed);
  } catch (error) {
    console.log("authentication-failed", error);
    return res.json(responses.authFailed);
  }
};

const getToken = (id) => {
  let token = "";
  try {
    token = jwt.sign({ id }, process.env.AUTH_TOKEN_PRIVATE_KEY, {
      expiresIn: "8h",
    });
    return token;
  } catch (error) {
    console.log("getToken-failed", error);
    return token;
  }
};

const verifyToken = async (token) => {
  let isValid = false;
  try {
    await jwt.verify(token, process.env.AUTH_TOKEN_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        console.log("verifyToken-err", err);
      } else {
        isValid = decoded;
      }
    });
    return isValid;
  } catch (error) {
    console.log("verifyToken-failed", error);
    return isValid;
  }
};

module.exports = { middleware, getToken };
