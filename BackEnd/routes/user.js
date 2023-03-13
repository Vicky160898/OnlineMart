const express = require("express");
const { createUser, loginUser, updateProfile } = require("../controller/user");
const isAuth = require("../middleware/isAuth");
const router = express.Router();


//user route for register and login..
router.post("/signup", createUser);
router.post("/login", loginUser);
router.patch("/update", isAuth, updateProfile);
module.exports = router;
