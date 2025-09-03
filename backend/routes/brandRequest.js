const express = require('express');
const router = express.Router();
const BrandRequest = require('../models/BrandRequest');
const mongoose = require('mongoose');

// Get all requests for a creator (optionally filter by status)
router.get('/', async (req, res) => {
  const { creatorId, status } = req.query;
  if (!creatorId || !mongoose.Types.ObjectId.isValid(creatorId)) {
    return res.status(400).json({ error: 'Invalid creatorId' });
  }
  const filter = { creatorId };
  if (status) filter.status = status;
  const requests = await BrandRequest.find(filter).populate('productId');
  res.json(requests);
});

// Create a new brand request
router.post('/', async (req, res) => {
  const { productId, brandId, creatorId, creatorName, message } = req.body;
  if (![productId, brandId, creatorId].every(mongoose.Types.ObjectId.isValid)) {
    return res.status(400).json({ error: 'Invalid IDs' });
  }
  const request = new BrandRequest({ productId, brandId, creatorId, creatorName, message });
  await request.save();
  res.status(201).json(request);
});

module.exports = router;