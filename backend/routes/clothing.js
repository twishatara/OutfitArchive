const express = require('express');
const AWS = require('aws-sdk');
const Clothing = require('../models/clothing');
const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Generate signed URL function
const generateSignedUrl = (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,  // Your S3 bucket name
    Key: key,  // The file name (S3 key)
    Expires: 60 * 5  // URL expiration time (5 minutes)
  };
  return s3.getSignedUrl('getObject', params);
};

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

// Route to get clothing item and signed image URL
router.get('/:id', async (req, res) => {
  try {
    // Fetch the clothing item from the database
    const clothing = await Clothing.findById(req.params.id);

    if (!clothing) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }

    // Generate signed URL for the image
    const signedUrl = generateSignedUrl(clothing.imageUrl);  // Assuming imageUrl is the S3 key

    // Send the clothing item data along with the signed URL
    res.status(200).json({
      clothing: {
        type: clothing.type,
        color: clothing.color,
        brand: clothing.brand,
        // Other clothing data
      },
      imageUrl: signedUrl  // Send the signed URL to the frontend
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
