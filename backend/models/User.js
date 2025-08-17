import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  bio: { type: String },
  company: { type: String },
  website: { type: String },
  dob: { type: Date },
  gender: { type: String },
  phone: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  type: { type: String, enum: ["creator", "brand"], required: true, index: true },
  handle: { type: String },
  followers: { type: Number },
  category: { type: String },
  rating: { type: Number },
  image: { type: String },
});

export default mongoose.model("User", userSchema);