const express = require("express");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const authMiddleware = require("../../middleware/auth");
const User = require("../../models/User");
const Message = require("../../models/Message");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    check("msg", "Message is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const msg = req.body.msg;
    const id = req.user.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(id);
      let fetchedUser = await User.findById(id);

      const message = new Message({
        name: fetchedUser.name,
        msg
      });

      await message.save();
      res.json(message);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
