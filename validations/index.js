"use strict";
const { check, body } = require("express-validator");

/**
 *    Api
 * validations
 */
const registration = [
  check("name", "Name is required.").notEmpty(),
  check("email", "Email is required.").notEmpty(),
  check("address", "Fuel type is required.").optional(),
  check("password", "Password is required.").notEmpty(),
  body("password", "Password should be atleast 7 characters long.").custom((str) => {
    if (String(str).trim().length > 6) {
      return true;
    } else {
      return false;
    }
  }),
];

const login = [
  check("email", "Email is required.").notEmpty(),
  check("password", "Password is required.").notEmpty(),
]

module.exports = { registration, login };
