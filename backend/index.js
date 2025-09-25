const express = require('express');
const mongoose = require('mongoose');

// Route imports
const categoryRoutes = require('./routes/categories');
const bannerRoutes = require('./routes/banners');
const productRoutes = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
// Note: You will need to replace this with your actual MongoDB connection string
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/asli-marketplace';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/products', productRoutes);

// Root path
app.get('/', (req, res) => {
  res.send('Welcome to the Asli Marketplace API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // For testing purposes