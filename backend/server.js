import path from "path";

// server.js
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
// import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.js";
import creatorRoutes from "./routes/creatorRoutes.js";
import User from "./models/User.js";
import authenticate from "./middleware/auth.js";
import storeRoutes from "./routes/storeRoutes.js";
import productsRoutes from "./routes/products.js";
import brandRequestRoutes from "./routes/brandRequest.js";
import checkoutRoutes from "./routes/checkout.js";
import dotenv from "dotenv";
import avatarUploadRoutes from "./routes/avatarUpload.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(json());
app.use(cookieParser());

// Connect to MongoDB
connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})

.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes


import brandsRoutes from "./routes/brands.js";

app.use("/api", authRoutes);
app.use("/api", userRoutes); 
app.use("/api/creator", creatorRoutes);
app.use("/api", storeRoutes);
app.use("/api", productsRoutes);
  app.use("/api/brand-requests", brandRequestRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api", avatarUploadRoutes);
// Serve uploads directory for avatars
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

