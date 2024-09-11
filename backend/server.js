const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/clothingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start the server
// Set the port to 7000
const PORT = 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
