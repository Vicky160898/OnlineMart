require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");


//creating new user route..
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await argon2.hash(password);
  const findUser = await UserModel.findOne({ email: email });
  try {
    if (!findUser) {
      //create a new user
      const newUser = await UserModel.create({ ...req.body, password: hash });
      res.json(newUser);
    } else {
      res.json({
        msg: "User Already Exists",
        success: false,
      });
    }
  } catch (e) {
    res.status(401).send("FILL ALL CREDENTIALS");
  }
};

//user login route....
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //check if user exists or not.
  const findUser = await UserModel.findOne({ email: email });
  try {
    if (await argon2.verify(findUser.password, password)) {
      //here i used jwt token for security purpose..
      const token = jwt.sign(
        {
          id: findUser._id,
          email: findUser.email,
          name: findUser.name,
          isAdmin: findUser.isAdmin,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "7 days",
        }
      );

      return res.status(201).send({
        message: "login successful",
        token: token,
        id: findUser._id,
        name: findUser.name,
        isAdmin: findUser.isAdmin,
      });
    } else {
      res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (e) {
    res.status(401).send("INVALID CREDENTIALS");
  }
};

module.exports = { createUser, loginUser };
