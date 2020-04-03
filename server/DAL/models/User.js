const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: [ 'Single', 'Married', 'Divorced', 'Widower']
  },
  kids: {
    type: [String]
  },
});

module.exports = mongoose.model('User', UserSchema);