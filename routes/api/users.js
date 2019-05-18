const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../../models/User");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required")
      .not()
      .isEmpty()
      .isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  }
);
module.exports = router;
