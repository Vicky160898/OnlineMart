const { query } = require("express");
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

const PAGE_SIZE = 3;
const GetFilterProduct = async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i", //case-sensitive
          },
        }
      : {};

  const categoryFilter = category && category !== "all" ? { category } : {};

  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};

  const priceFilter =
    price && price !== "all"
      ? {
          //1-50
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const product = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProduct = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    product,
    countProduct,
    page,
    pages: Math.ceil(countProduct / pageSize),
  });
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
    like,
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
        like: like,
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

const ProductLike = async (req, res) => {
  const { id } = req.params;
  const { like } = req.body;
  try {
    const data = await Product.findOne({ _id: id });
    if (!data) {
      return res.status(401).send("Data not found");
    } else {
      await Product.updateOne({ _id: id }, { $set: { like: like } });
      return res.status(201).send(data);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  Postproduct,
  GetProduct,
  GetSingleProduct,
  CartProduct,
  ProductLike,
  GetFilterProduct,
};
