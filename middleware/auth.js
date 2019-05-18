const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ msg: "Invalid credentials. Wrong token" });
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecretPassword"));

    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
