const { Schema, model } = require("mongoose");

// Declare the Schema of the Mongo model
const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    brand: { type: String, required: true },
    numReviews: { type: Number, required: true },
    rating: { type: Number, requred: true },
    description: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = model("product", ProductSchema);
module.exports = Product;
