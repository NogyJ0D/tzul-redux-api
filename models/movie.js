const { mongoose } = require('../config/database')

const movieModel = mongoose.model('movies', new mongoose.Schema({
  name: {
    // type: [String, 'The title must be an string, "{VALUE}" is no valid.'],
    // required: [true, 'The title is required.'],
    type: String,
    required: true,
    trim: true
  },
  rating: {
    // type: [Number, 'The rating must be a Number, "{VALUE}" is not valid.'],
    // min: [0, 'The minimum value is 0.'],
    // max: [5, 'The maximum value is 5.'],
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  description: {
    // type: [String, 'The description must be an string, "{VALUE}" is no valid.'],
    // required: [true, 'The description is required.'],
    type: String,
    required: true,
    trim: true
  },
  year: {
    // type: [String, 'The year must be an string, "{VALUE}" is not valid.'],
    type: String,
    default: undefined,
    trim: true
  },
  banner: {
    // type: [String, 'The banner must be an string, "{VALUE}" is not valid.'],
    // required: [true, 'The banner is required.'],
    type: String,
    required: true,
    trim: true
  },
  poster: {
    // type: [String, 'The poster must be an string, "{VALUE}" is not valid.'],
    // required: [true, 'The poster is required.'],
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}))

module.exports = movieModel
