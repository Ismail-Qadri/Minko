// routes/storeRoutes.js
import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Products.js";
import User from "../models/User.js";

const router = Router();

/**
 * GET /api/store/:id
 * Fetch creator profile + products
 */
router.get("/store/:id", async (req, res) => {
  try {
    const creatorId = req.params.id;

    // ✅ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ message: "Invalid creator ID" });
    }

    // ✅ Get creator details (exclude password)
    const creator = await User.findById(creatorId).select("-password");
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    // ✅ Get all products for this creator
    const products = await Product.find({ creatorId });

    // ✅ Return combined data
    res.json({
      creator,
      products,
    });
  } catch (err) {
    console.error("❌ Error fetching store:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
