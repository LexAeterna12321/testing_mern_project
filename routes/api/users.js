const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");

const User = require("../../models/User");

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access   Public

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
    check("password", "Please enter a password with 5 or more characters")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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

      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecretPassword"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/users
// @desc    Get all users
// @access   Private

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/users/me
// @desc    Get user by id
// @access   Private
router.get("/me", authMiddleware, async (req, res) => {
  console.log(req);
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");

    if (!user) return res.status(400).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/users/:user_id
// @desc    delete user
// @access   Private

router.delete("/:user_id", authMiddleware, async (req, res) => {
  const id = req.user.id;
  const user = await User.findOneAndRemove({ _id: id });
  if (!user)
    return res.status(400).send("Operation cannot be completed. No user");
  res.send({ user });
});
module.exports = router;
