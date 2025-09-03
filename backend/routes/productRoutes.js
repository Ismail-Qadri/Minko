const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get products by creator
router.get('/creator', async (req, res) => {
  const { creator } = req.query;
  if (!creator) return res.status(400).json({ error: 'Missing creator' });
  const products = await Product.find({ creator });
  res.json(products);
});

// Delete a creator's product
router.delete('/creator/:productId', async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.json({ success: true });
});

// Get all brand products
router.get('/brand', async (req, res) => {
  const products = await Product.find({ brand: { $exists: true, $ne: null } });
  res.json(products);
});

module.exports = router;