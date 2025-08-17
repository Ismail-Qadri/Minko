import { Schema, model } from "mongoose";

const productSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  category: String,
  commission: Number,
  stock: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  status: { type: String, default: "active" },
  isBrandProduct: { type: Boolean, default: false }
}, { timestamps: true });

export default model("Product", productSchema);
