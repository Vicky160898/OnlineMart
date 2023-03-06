const { Schema, model } = require("mongoose");

// Declare the Schema of the Mongo model
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false, required: true },
    order_id: { type: Schema.Types.ObjectId, ref: "order" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("user", UserSchema);
module.exports = User;
