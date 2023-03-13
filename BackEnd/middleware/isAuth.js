require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    console.log(token);
    try {
      const verification = await jwt.verify(token, process.env.SECRET_KEY);
      //console.log(verification);
      if (verification) {
        req.userId = verification.id;
        // req.role = verification.role;
        next();
      } else {
        res.status(401).send("Operation not allowed.");
      }
    } catch (e) {
      return res.send(e.message);
    }
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

module.exports = isAuth;
