const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.body.image,
    parent: req.body.parent,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a single category by ID
router.get('/:id', getCategory, (req, res) => {
  res.json(res.locals.category);
});

// PATCH/update a category
router.patch('/:id', getCategory, async (req, res) => {
  if (req.body.name != null) {
    res.locals.category.name = req.body.name;
  }
  if (req.body.image != null) {
    res.locals.category.image = req.body.image;
  }
  if (req.body.parent != null) {
    res.locals.category.parent = req.body.parent;
  }
  try {
    const updatedCategory = await res.locals.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a category
router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.locals.category.deleteOne();
    res.json({ message: 'Deleted Category' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a category by ID
async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.locals.category = category;
  next();
}

module.exports = router;