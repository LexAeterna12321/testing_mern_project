const express = require("express");
const { check, validationResult } = require("express-validator/check");

const router = express.Router();
router.post("/", (req, res) => {
  console.log(req);
});
module.exports = router;
