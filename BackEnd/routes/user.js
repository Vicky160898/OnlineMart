const express = require("express");
const { createUser, loginUser } = require("../controller/user");
const router = express.Router();

//user route for register and login..
router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;
