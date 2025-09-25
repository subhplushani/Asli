const express = require('express');
const router = express.Router();
const Banner = require('../models/banner');

// GET all active banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).limit(5);
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new banner (for admin use)
router.post('/', async (req, res) => {
    const banner = new Banner({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        targetUrl: req.body.targetUrl,
        isActive: req.body.isActive
    });

    try {
        const newBanner = await banner.save();
        res.status(201).json(newBanner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;