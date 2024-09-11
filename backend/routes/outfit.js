const express = require('express');
const router = express.Router();
const Outfit = require('../models/outfit');

// API endpoint that allows users to combine clothing items
// Create an outfit
// Send the name and an array of clothing item ID (from prev added clothing)
router.post('/create', async (req, res) => {
  try {
    const { name, clothingIds } = req.body;
    const newOutfit = new Outfit({ name, clothingItems: clothingIds });
    await newOutfit.save();
    res.status(201).json(newOutfit);
  } catch (error) {
    res.status(400).json({ error: 'Error creating outfit' });
  }
});

// Get all outfits
router.get('/', async (req, res) => {
  try {
    const outfits = await Outfit.find().populate('clothingItems');
    res.status(200).json(outfits);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching outfits' });
  }
});

module.exports = router;
