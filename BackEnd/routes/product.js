const express = require("express");
const {
  Postproduct,
  GetProduct,
  GetSingleProduct,
  CartProduct,
  ProductLike,
  GetFilterProduct,
} = require("../controller/product");
const router = express.Router();

//All the product routes here..
router.post("/add", Postproduct);
router.get("/", GetProduct);
router.get("/slug/:id", GetSingleProduct);
router.get("/api/product/:id", CartProduct);
router.patch("/like/:id", ProductLike);
router.get("/search", GetFilterProduct);

module.exports = router;
