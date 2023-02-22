const jwt = require("jsonwebtoken");
require("dotenv").config();
const GenerateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, isAdmin: user.isAdmin },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = GenerateToken;
