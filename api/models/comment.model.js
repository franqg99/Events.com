const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
})

const commentModel = mongoose.model('comment', commentSchema)
module.exports = commentModel