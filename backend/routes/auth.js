import { Router } from "express";
import { hash, compare } from "bcryptjs";
import User from "../models/User.js";
import PendingUser from "../models/PendingUser.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_fallback";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const router = Router();

// @route   POST /api/register
// @desc    Register new user (store in PendingUser, send verification code)
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
    youtube,
    instagram,
    type,
    handle,
    followers,
    category,
    rating,
    image,
  } = req.body;

  try {
    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if email is already in use in User or PendingUser
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }
    const existingPending = await PendingUser.findOne({ email: normalizedEmail });
    if (existingPending) {
      return res.status(400).json({ message: "Verification pending. Please check your email." });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

    // Create new pending user
    const pendingUser = new PendingUser({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
      bio,
      company,
      website,
      dob,
      gender,
      phone,
      youtube,
      instagram,
      type,
      handle,
      followers,
      category,
      rating,
      image
    });

    await pendingUser.save();

    let info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: normalizedEmail,
      subject: "Verify your email",
      text: `Your verification code is ${verificationCode}. It expires in 15 minutes.`
    });

    // Log Ethereal preview URL if available
    const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null;
    if (previewUrl) {
      console.log("Ethereal email preview URL:", previewUrl);
    }

    res.status(201).json({ message: "Verification code sent to your email.", previewUrl });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// @route   POST /api/verify
// @desc    Verify email and save user to User collection
router.post("/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required." });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    const pendingUser = await PendingUser.findOne({ email: normalizedEmail });
    if (!pendingUser) {
      return res.status(400).json({ message: "No pending registration found." });
    }

    if (pendingUser.verificationCodeExpires < new Date()) {
      await PendingUser.deleteOne({ email: normalizedEmail });
      return res.status(400).json({ message: "Verification code has expired. Please register again." });
    }

    if (pendingUser.verificationCode.toString() === code.toString()) {
      // Create new user in main collection
      const newUser = new User({
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password,
        isVerified: true,
        bio: pendingUser.bio,
        company: pendingUser.company,
        website: pendingUser.website,
        dob: pendingUser.dob,
        gender: pendingUser.gender,
        phone: pendingUser.phone,
        youtube: pendingUser.youtube,
        instagram: pendingUser.instagram,
        type: pendingUser.type,
        handle: pendingUser.handle,
        followers: pendingUser.followers,
        category: pendingUser.category,
        rating: pendingUser.rating,
        image: pendingUser.image
      });

      await newUser.save();
      await PendingUser.deleteOne({ email: normalizedEmail });

      return res.json({ message: "Email verified successfully. Account created." });
    } else {
      return res.status(400).json({ message: "Invalid verification code." });
    }
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// @route   POST /api/login
// @desc    Login user
router.post("/login", async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase(), type });
    console.log("Login attempt for:", email, "type:", type);
    console.log("User found:", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or user type." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first." });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = sign(
      { id: user._id, type: user.type },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("Login successful. Sending response with user:", user, "and token:", token);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production", // Secure in production
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// @route   POST /api/cleanup
// @desc    Clean up expired pending users
router.post("/cleanup", async (req, res) => {
  try {
    await PendingUser.deleteMany({
      verificationCodeExpires: { $lt: new Date() }
    });
    res.status(200).json({ message: "Expired pending users cleaned up." });
  } catch (err) {
    console.error("Cleanup error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;