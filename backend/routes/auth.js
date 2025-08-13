// routes/auth.js
import { Router } from "express";
import { hash, compare } from "bcryptjs";
import User from "../models/User.js"; // Ensure correct import path

import pkg from 'jsonwebtoken';
const { sign } = pkg;

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_fallback"; // 🔐 Replace with env var in production


const router = Router();

// @route   POST /api/register
// @desc    Register new user
router.post("/register", async (req, res) => {
 const {
    name,
    email,
    password,
    bio,
    company,
    website,
    dob,
    gender,
    phone,
    platform,
    youtube,
    instagram,
    type,
    handle,
    followers,
    category,
    rating,
    image
  } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
   const newUser = new User({
      name,
      email,
      password: hashedPassword,
      bio,
      company,
      website,
      dob,
      gender,
      phone,
      platform,
      youtube,
      instagram,
      type,
      handle,
      followers,
      category,
      rating,
      image
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const user = await User.findOne({ email, type });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or user type" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = sign(
      { id: user._id, type: user.type },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send token as HTTP-only cookie (optional, see below)
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax", // or 'Strict' for more security
        secure: false, // Set to true in production with HTTPS
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful", user: { name: user.name, email: user.email, type: user.type }, token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
