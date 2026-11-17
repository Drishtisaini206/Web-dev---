const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products (Filtering, Sorting, Pagination)
router.get('/', async (req, res, next) => {
  try {
    let { page = 1, limit = 10, category, sortBy, order = 'asc' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};
    if (category) query.category = { $regex: category, $options: 'i' };

    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    else sortOptions.createdAt = -1;

    const products = await Product.find(query).sort(sortOptions).limit(limit).skip((page - 1) * limit);
    const total = await Product.countDocuments(query);

    res.status(200).json({ total, page, totalPages: Math.ceil(total / limit), count: products.length, products });
  } catch (err) { next(err); }
});

// Category-wise summary aggregation
router.get('/summary', async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      { $group: { _id: '$category', totalItems: { $sum: 1 }, totalQuantity: { $sum: '$quantity' }, totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } }, avgPrice: { $avg: '$price' } } }
    ]);
    res.status(200).json({ success: true, categories: summary.length, summary });
  } catch (err) { next(err); }
});

// Low-stock report
router.get('/low-stock', async (req, res, next) => {
  try {
    const lowStockProducts = await Product.aggregate([{ $match: { $expr: { $lte: ['$quantity', '$reorderLevel'] } } }]);
    res.status(200).json({ count: lowStockProducts.length, lowStockItems: lowStockProducts });
  } catch (err) { next(err); }
});

// Get single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) { next(err); }
});

// Create product
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) { next(err); }
});

// Update product
router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (err) { next(err); }
});

// Stock adjustment
router.patch('/:id/stock', async (req, res, next) => {
  try {
    const { change } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const newQuantity = product.quantity + change;
    if (newQuantity < 0) return res.status(400).json({ success: false, message: 'Insufficient stock available' });

    product.quantity = newQuantity;
    await product.save();
    res.status(200).json({ message: 'Stock updated', product });
  } catch (err) { next(err); }
});

// Delete product
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted', id: req.params.id });
  } catch (err) { next(err); }
});

module.exports = router;