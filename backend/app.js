const express = require('express');
const app = express();
const clothingRoutes = require('./routes/clothing');
const outfitRoutes = require('./routes/outfit');

// Middleware
app.use(express.json());

// Routes
app.use('/clothing', clothingRoutes);
app.use('/outfit', outfitRoutes);

module.exports = app;
