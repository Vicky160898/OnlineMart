require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/ordermodel");

const orders = (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.send({ code: 500, message: "server err" });
    }

    return res.send({ code: 200, message: "order created", data: order });
  });
};

const verify = async (req, res) => {
  const Neworder = new Order({
    cartitems: req.body.cartitems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    razorpay_payment_id: req.body.razorpay_payment_id,
    razorpay_order_id: req.body.razorpay_order_id,
    razorpay_signature: req.body.razorpay_signature,
    amount: req.body.amount,
    user: req.userId,
  });
  let order = await Neworder.save();
  let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === req.body.razorpay_signature) {
    res.status(200).send(order);
  } else {
    res.send({ code: 500, message: "sign not valid" });
  }
};

const GetOrder = async (req, res) => {
  const { id } = req.params;
  const detail = await Order.findById({ _id: id }).populate("user");
  if (detail) {
    return res.send(detail);
  } else {
    return res.status(404).send({ message: "Order Not Found" });
  }
};

const GetUserOrder = async (req, res) => {
  const detail = await Order.find({ user: req.userId });
  if (detail) {
    return res.status(200).send(detail);
  } else {
    return res.status(404).send({ message: "Order Not Found" });
  }
};

module.exports = { verify, orders, GetOrder, GetUserOrder };
