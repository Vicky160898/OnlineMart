const express = require("express");
const {
  Postproduct,
  GetProduct,
  GetSingleProduct,
  CartProduct,
} = require("../controller/product");
const router = express.Router();

//All the product routes here..
router.post("/add", Postproduct);
router.get("/", GetProduct);
router.get("/slug/:id", GetSingleProduct);
router.get("/api/product/:id", CartProduct);

module.exports = router;
