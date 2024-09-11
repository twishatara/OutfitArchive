// Schema for outfits 
// Refrences the clothing items

const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clothingItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clothing' }],
  dateCreated: { type: Date, default: Date.now }
});

const Outfit = mongoose.model('Outfit', outfitSchema);
module.exports = Outfit;
