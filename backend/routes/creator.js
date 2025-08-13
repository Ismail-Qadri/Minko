import { Router } from "express";
import authenticate from "../middleware/auth.js";
const router = Router();

// ✅ Default route (optional)
router.get("/", authenticate, (req, res) => {
  res.json({
    message: `Welcome ${req.user.type}! Your user ID is ${req.user.id}`,
  });
});

// ✅ NEW: Protected Creator Dashboard Route
router.get("/dashboard", authenticate, (req, res) => {
  res.json({
    message: `Welcome to the dashboard, ${req.user.type}`,
    user: {
      id: req.user.id,
      type: req.user.type,
    },
  });
});


// router.get("/api/users", async (req, res) => {
//   try {
//     const { type } = req.query;
//     let filter = {};
//     if (type) {
//       filter.type = type; // This will only match "creator" if given
//     }

//     const users = await User.find(filter); // Adjust to your DB model
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users" });
//   }
// });

export default router;
