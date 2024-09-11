const mongoose = require('mongoose');

// Schema to store clothing data in MongoDB
// Add properties by type color brand..
const clothingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  color: { type: String, required: true },
  brand: { type: String },
  imageUrl: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now }
});

const Clothing = mongoose.model('Clothing', clothingSchema);
module.exports = Clothing;
