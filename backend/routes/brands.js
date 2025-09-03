import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

// GET /api/brands/:id - Get brand by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid brand ID' });
    }
    const brand = await User.findById(id);
    if (!brand || brand.type !== 'brand') {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching brand', error: err.message });
  }
});

// PUT /api/brands/:id - Update brand by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid brand ID' });
    }
    const update = req.body;
    const brand = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!brand || brand.type !== 'brand') {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: 'Error updating brand', error: err.message });
  }
});

export default router;
