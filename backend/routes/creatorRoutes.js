// server.js or routes/creators.js
import express from "express";
import Creator from "../models/Creator.js"; // your mongoose model

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id);
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    res.json(creator); // return raw JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
