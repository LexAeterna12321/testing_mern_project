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
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      let fetchedUser = await User.findOne({ email });

      if (fetchedUser) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      const user = new User({
        name,
        email,
        password
      });

      //   password encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(200).json("User registered.");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
