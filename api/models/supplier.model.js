const mongoose = require('mongoose')
const commentSchema = require('comment.model')

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      }
    },
    // TODO: Make sure unique index works from Mongoose
    unique: [true, 'This is email is registered']
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  sector: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  comments : [commentSchema],

  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
})

const supplierModel = mongoose.model('supplier', supplierSchema)
module.exports = supplierModel
