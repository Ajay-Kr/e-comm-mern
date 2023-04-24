const router = require('express').Router();
const createErrors = require('http-errors');
const JWT = require('jsonwebtoken');
const User = require('../Models/User.model');

const secretKey = 'the secret';

router.post('/register', async(req, res, next) => {
  try {
    const doesExist = await User.findOne({email: req.body.email});
    if(doesExist) 
      throw createErrors.Conflict(`${doesExist.email} is already registerd`);
    
    const user = new User(req.body);
    const savedUser = await user.save();
    
    const result = savedUser.toObject();
    delete result.password;

    JWT.sign(
      {result},
      secretKey,
      {expiresIn: '2h'},
      (err, token) => {
        if(err) {
          throw createErrors.InternalServerError();
        }
        res.send({result, auth: token});
      }
    );
    // res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    if(!req.body.email || !req.body.password) throw createErrors.Unauthorized("Missing Email/Password");
    const user = await User.findOne(req.body).select('-password');
    if(!user) throw createErrors.NotFound("Incorrect Email/Password");
    JWT.sign(
      {user},
      secretKey,
      {expiresIn: '2h'},
      (err, token) => {
        if(err) {
          throw createErrors.InternalServerError();
        }
        res.send({user, auth: token});
      }
    );
    // res.send(user);
  } catch (error) {
    next(error);
  }
});

function verifyToken(req, res, next) {
  console.log('')
}

module.exports = router;