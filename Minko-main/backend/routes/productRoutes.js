import { Router } from "express";
import Product from "../models/Products.js";
import authenticate from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/products
 * Add new product
 */
// Add new product
router.post("/creator/products", authenticate, async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const newProduct = new Product({
      creatorId: req.user.id, // comes from JWT
      name,
      price,
      image,
      description
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//get products
router.get("/creator/products", authenticate, async (req, res) => {
  try {
    const products = await Product.find({ creatorId: req.user.id });
    res.json(products);
  } catch (err) {
    console.error("Error fetching creator products:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/**
 * PUT /api/users/:id
 * Update profile
 */
router.put("/users/:id", authenticate, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updateData = { ...req.body };
    delete updateData.password; // don't allow password update here

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
