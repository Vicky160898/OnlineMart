require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connect = require("./config/db");
const cors = require("cors");
const ProductSchema = require("./routes/product");
const UserRoute = require("./routes/user");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

app.use("/", ProductSchema);
app.use("/api", UserRoute);
connect();
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
