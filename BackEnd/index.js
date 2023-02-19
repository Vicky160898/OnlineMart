require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URL)
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
