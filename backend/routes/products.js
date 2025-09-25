const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const ProductVariation = require('../models/productVariation');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('variations');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    store: req.body.store,
    mainImage: req.body.mainImage,
    images: req.body.images,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a single product by ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.locals.product);
});

// POST a new variation to a product
router.post('/:id/variations', getProduct, async (req, res) => {
    const variation = new ProductVariation({
        product: res.locals.product._id,
        attribute: req.body.attribute,
        value: req.body.value,
        price: req.body.price,
        stock: req.body.stock,
    });

    try {
        const newVariation = await variation.save();
        res.locals.product.variations.push(newVariation._id);
        await res.locals.product.save();
        res.status(201).json(newVariation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Middleware to get a product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id).populate('variations');
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.locals.product = product;
  next();
}

module.exports = router;