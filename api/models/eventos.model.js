const mongoose = require('mongoose')

const eventosSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  event: {
		name: String,
		img: String,
		tasks: Array
	}
})

const eventosModel = mongoose.model('eventos', eventosSchema)
module.exports = eventosModel