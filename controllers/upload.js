const userHandler = require("../db-handlers/user");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const path = require("path");
const multer = require("multer");
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/../public/images/"));
  },
  filename: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
    const extension = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
      cb(null, new Date().getTime() + file.originalname);
    } else {
      cb({
        message:
          "Invalid file type. Only JPEG, jpg, PNG, GIF and pdf file are allowed.",
      });
    }
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 },
}).single("filename");

/**
 * @method uploadImage: This function use to upload user profile picture
 * @param {Object} req get request from the user
 * @param {Object} res send response to the user
 */
module.exports.uploadImage = async (req, res) => {
  try {
    return upload(req, res, async (err) => {
      if (err) {
        console.log("image-upload", err);
        return res.json({
          status: 400,
          message:
            err.message === "File too large"
              ? "File size should be less than 3 MB."
              : err.message || "Invalid File",
        });
      }
      const id = (req.user && req.user._id) || "";
      const file = req.file;
      const data = {
        cond: {
          _id: ObjectID(id),
        },
        obj: {
          profile_pic: process.env.BACKEND_API_URL + `/images/${file.filename}`,
        },
      };
      const isUpdated = await userHandler.update(data);
      if (isUpdated) {
        return res.json({
          status: 200,
          message: "Image uploaded successfully.",
        });
      } else {
        return res.json({ status: 400, message: "Image uploading failed" });
      }
    });
  } catch (err) {
    console.log("uploadImage", err);
    return res.json({ status: 400, message: "Image uploading failed" });
  }
};
