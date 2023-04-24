const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;