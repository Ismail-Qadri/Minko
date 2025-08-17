import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  verificationCode: { type: String, required: true },
  verificationCodeExpires: { type: Date, required: true, index: { expires: "15m" } },
  bio: { type: String },
  company: { type: String },
  website: { type: String },
  dob: { type: Date },
  gender: { type: String },
  phone: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  type: { type: String, enum: ["creator", "brand"], required: true },
  handle: { type: String },
  followers: { type: Number },
  category: { type: String },
  rating: { type: Number },
  image: { type: String },
});

export default mongoose.model("PendingUser", pendingUserSchema);