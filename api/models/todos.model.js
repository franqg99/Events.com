const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  task: {
    type: String,
    required: [true, 'Task is required']
  },
  isDone: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Number,
    default: Date.now()
  }
})

const todoModel = mongoose.model('todos', todoSchema)
module.exports = todoModel
