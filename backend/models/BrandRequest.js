const mongoose = require('mongoose');
const BrandRequestSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'BrandProfile', required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: String },
  status: { type: String, enum: ['pending', 'brand-approved', 'rejected'], default: 'pending' },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('BrandRequest', BrandRequestSchema);