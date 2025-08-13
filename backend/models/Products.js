import { Schema, model } from "mongoose";

const productSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String
}, { timestamps: true });

export default model("Product", productSchema);
