const EventosModel = require('../models/eventos.model')
const { handleError } = require('../utils')

module.exports = {
  createEvent
}


function createEvent (req, res) {
  EventosModel
    .create({ owner: res.locals.user._id, event: req.body.name })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}