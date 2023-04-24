const router = require('express').Router();
const createError = require('http-errors');
const Product = require('../Models/Product.model');
const JWT = require('jsonwebtoken');

const secretKey = 'the secret';

router.post('/add', verifyToken, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();

    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/all', verifyToken, async (req, res, next) => {
  try {
    const products = await Product.find();
    if(products.length <= 0) res.send({result: "No products found"});
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.delete('/delete/:id', verifyToken, async (req, res, next) => {
  const fetchedData = await Product.findOne({_id: req.params.id});
  if(!fetchedData) {
    console.log("Product does not exist");
    throw createError.Unauthorized('Product does not exist');
  }
  const result = await Product.deleteOne({_id: req.params.id});
  res.send(result);
});

router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const product = await Product.findOne({_id: req.params.id});
    if(!product) throw createError.NotFound("No product found");

    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put('/update/:id', verifyToken, async (req, res, next) => {
  try {
    const result = await Product.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    );
    if(!result) throw createError.NotFound('Product not found');

    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/search/:key', verifyToken, async (req, res, next) => {
  try {
    const fetchedData = await Product.find({
      "$or": [
        {name: {$regex: req.params.key}},
        {price: {$regex: req.params.key}},
        {category: {$regex: req.params.key}},
        {company: {$regex: req.params.key}}
      ]
    });

    res.send(fetchedData);
  } catch (error) {
    next(error);
  }
});

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];
  if(token) {
    token = token.split(' ')[1];
    JWT.verify(token, secretKey, (err, valid) => {
      if(err) throw createError.Unauthorized('Provide valid token');
      else next();
    });
  } else throw createError.Unauthorized('Please add token');
}


module.exports = router;