const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: String,
  status: { type: Boolean, default: false}  
})

const eventsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: String,
  img: String,
  tasks: [TaskSchema]
})

module.exports = mongoose.model('event', eventsSchema)
