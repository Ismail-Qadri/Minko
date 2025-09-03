import { Schema, model } from 'mongoose';
const BrandRequestSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  brandId: { type: Schema.Types.ObjectId, ref: 'BrandProfile', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: String },
  status: { type: String, enum: ['pending', 'brand-approved', 'rejected'], default: 'pending' },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});
export default model('BrandRequest', BrandRequestSchema);