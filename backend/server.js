// // server.js
// import express, { json } from "express";
// import { connect } from "mongoose";
// import cors from "cors";
// // import { config } from "dotenv";
// import cookieParser from "cookie-parser";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/auth.js";
// import creatorRoutes from "./routes/creator.js";
// import User from "./models/User.js";
// import authenticate from "./middleware/auth.js";
// import storeRoutes from "./routes/storeRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import dotenv from "dotenv";
// import brandRoutes from "./routes/brandRoutes.js";

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(json());

// // Connect to MongoDB
// connect(process.env.MONGO_URI, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// })

// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Routes

// app.use("/api", authRoutes);
// app.use("/api", userRoutes); 
// app.use(cookieParser());
// app.use("/api/creator", creatorRoutes);
// app.use("/api", storeRoutes);
// app.use("/api", productRoutes);
// app.use("/api/brand", brandRoutes);


// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
// import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.js";
import creatorRoutes from "./routes/creator.js";
import User from "./models/User.js";
import authenticate from "./middleware/auth.js";
import storeRoutes from "./routes/storeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})

.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes

app.use("/api", authRoutes);
app.use("/api", userRoutes); 
app.use(cookieParser());
app.use("/api/creator", creatorRoutes);
app.use("/api", storeRoutes);
app.use("/api", productRoutes);
app.use("/api/brand", brandRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
