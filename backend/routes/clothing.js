const express = require('express');
const router = express.Router();
const Clothing = require('../models/clothing');

// API endpoint to add a clothing item
// Assume that the image is uploaded sepratley and that the URL is being stored
// Send POST request with the details in the request body
router.post('/add', async (req, res) => {
  try {
    const { type, color, brand, imageUrl } = req.body;
    const newClothing = new Clothing({ type, color, brand, imageUrl });
    await newClothing.save();
    res.status(201).json(newClothing);
  } catch (error) {
    res.status(400).json({ error: 'Error adding clothing item' });
  }
});

// Get all clothing items
router.get('/', async (req, res) => {
  try {
    const clothing = await Clothing.find();
    res.status(200).json(clothing);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching clothing items' });
  }
});

module.exports = router;
