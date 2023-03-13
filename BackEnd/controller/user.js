require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
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
      console.log(token);
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

//configure cloudinary for storing uploaded images
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const updateProfile = async (req, res) => {
  try {
    //upload the image to cloudinary
    const profile = await UserModel.findOne({ _id: req.userId });

    if (!profile) {
      res.status(401).send("Profile Not Found");
    }

    const result = await cloudinary.uploader.upload(
      req.body.image,
      { folder: "users" } //optinal : specify a folder for the uploaded image
    );
    console.log(result);
    //save the url of the uploaded image in the database
    const imageUrl = result.secure_url;
    await UserModel.findOneAndUpdate(
      { _id: req.userId },
      { $set: { image: imageUrl } },
      { new: true }
    );
    res.status(200).send(imageUrl);
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = { createUser, loginUser, updateProfile };
