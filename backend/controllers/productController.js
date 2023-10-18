const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      brand,
      quantity,
      description,
      image,
      regularPrice,
      price,
      color,
    } = req.body;

    if (
      !name ||
      !sku ||
      !category ||
      !brand ||
      !quantity ||
      !description ||
      !regularPrice ||
      !price
    ) {
      res.status(400);
      throw new Error('Please fill in all fields');
    }

    const product = await Product.create({
      name,
      sku,
      category,
      brand,
      quantity,
      price,
      description,
      regularPrice,
      image,
      color,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort('-createdAt');
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error('Error occured when fetching product', error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(400);
      throw new Error('Product not found');
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error('Error getting a product', error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(201);
      throw new Error('product not found');
    } else {
      await Product.findByIdAndDelete(req.params.id);
      res.status(201).json({
        message: 'product deleted successfully',
      });
    }
  } catch (error) {
    console.log('failed to delete product', error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      quantity,
      description,
      image,
      regularPrice,
      price,
      color,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(201);
      throw new Error('product not found');
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name,
          category,
          brand,
          quantity,
          description,
          image,
          regularPrice,
          price,
          color,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        updatedProduct,
        message: 'product updated successfully',
      });
    }
  } catch (error) {
    console.log('failed to update product', error);
  }
});

const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params; 
  //validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error('Please add a start and review');
  }
  const product = await Product.findById(id);
  if (!product) {
    res.status(400);
    throw new Error('product not found');
  }
  //update rating
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    userId: req.user._id,
  });

  //save product
  await product.save();
  res.status(200).json({ message: 'product review added' });
});

const deleteReview = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('product not found');
  }

  // Filter out the review with the specified userId
  const newRatings = product.ratings.filter((rating) => {
    return rating.userId.toString() !== userId.toString();
  });
  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: 'Product review deleted' });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
};
