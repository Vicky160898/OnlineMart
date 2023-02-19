const Product = require("../models/productmodel");

//here we are getting all the product...
const GetProduct = async (req, res) => {
  const Data = await Product.find();
  try {
    if (!Data) {
      return res.send("product not found");
    } else {
      return res.status(201).send(Data);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//here we are adding the data into database..
const Postproduct = async (req, res) => {
  const {
    name,
    slug,
    category,
    image,
    price,
    countInStock,
    brand,
    numReviews,
    rating,
    description,
  } = req.body;
  try {
    const data = await Product.findOne({ name: name });
    if (!data) {
      const Newproduct = new Product({
        name: name,
        slug: slug,
        category: category,
        image: image,
        price: price,
        countInStock: countInStock,
        brand: brand,
        numReviews: numReviews,
        rating: rating,
        description: description,
      });
      await Newproduct.save();
      return res.status(200).send(Newproduct);
    } else {
      return res.status(404).send("product already present..");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const GetSingleProduct = async (req, res) => {
  const { id } = req.params;
  const Data = await Product.findOne({ _id: id });
  try {
    if (!Data) {
      return res.send("product not found");
    } else {
      return res.status(201).send(Data);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const CartProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = await Product.findOne({ _id: id });
  try {
    if (!newProduct) {
      return res.send("product already added into card");
    } else {
      return res.status(201).send(newProduct);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { Postproduct, GetProduct, GetSingleProduct, CartProduct };
