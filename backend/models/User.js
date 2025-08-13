// models/User.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bio: String,
  company: String,
  website: String,
  dob: String,
  gender: String,
  phone: String,
  platform: String,
  youtube: String,
  instagram: String,
  handle: String,
  followers: String,
  category: String,
  rating: String,
  image: String,
  type: { type: String, enum: ["creator", "brand"], required: true },
}, { timestamps: true });

export default model("User", userSchema);


