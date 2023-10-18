const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please and a name'],
      trim: true, //remove any space around the name
    },
    sku: {
      //sku -- stock keeping unit
      type: String,
      required: true,
      default: 'SKU',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please and a category'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please and a brand'],
      trim: true,
    },

    color: {
      type: String,
      required: [true, 'Please and a color'],
      default: 'As seee',
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please and a quantity'],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    regualarPrice: {
      type: Number,
      // required: [true, "Please and a price"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please and a price'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please and a description'],
      trim: true,
    },
    image: {
      type: [String], //mutiple images
    },
    ratings: {
      type: [Object],
    },
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
