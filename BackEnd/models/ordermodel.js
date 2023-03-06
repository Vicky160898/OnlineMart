const { Schema, model } = require("mongoose");

// Declare the Schema of the Mongo model
const OrderSchema = new Schema(
  {
    cartitems: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      name: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      code: { type: String, required: true },
    },
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = model("order", OrderSchema);
module.exports = Order;
