const mongoose = require('mongoose')

const eventsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  event: {
    name: String,
    img: String,
    tasks: Array
  }
})

module.exports = mongoose.model('event', eventsSchema)
