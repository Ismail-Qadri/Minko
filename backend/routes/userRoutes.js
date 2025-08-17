// routes/userRoutes.js
import { Router } from "express";
import User from "../models/User.js"; // Ensure .js extension in ES modules

const router = Router();

// GET all users by type
router.get("/users", async (req, res) => {
  try {
    const { type } = req.query; // e.g., ?type=creator
    let filter = {};

    if (type) {
      filter.type = type; // match creators only
    }

    const users = await User.find(filter).select("-password"); // exclude password
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
