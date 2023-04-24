const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;