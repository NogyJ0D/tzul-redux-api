const { mongoose } = require('../config/database')

const userModel = mongoose.model('users', new mongoose.Schema({
  username: {
    // type: [String, 'The username must be an string, "{VALUE}" is not valid.'],
    // required: [true, 'The username is required.'],
    // unique: [true, 'This username already exists.'],
    // maxlength: [15, 'The max length for the username is 15 characters.'],
    type: String,
    required: true,
    unique: true,
    maxlength: 15,
    trim: true
  },
  email: {
    // type: [String, 'The email must be an string, "{VALUE}" is not valid.'],
    // required: [true, 'The email is required.'],
    // unique: [true, 'This email already exists.'],
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    // type: [String, 'The password must be an string.'],
    // required: [true, 'The password is required.']
    // required: true,
    type: String
  },
  role: {
    type: Number,
    default: 1
  },
  provider: String,
  idProvider: String
})
)

module.exports = userModel
