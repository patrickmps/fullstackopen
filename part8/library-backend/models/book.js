const mongoose = require('mongoose')

// you must install this library
// const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String }
  ]
})

// bookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', bookSchema)