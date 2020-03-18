const EventsModel = require('../models/events.model')
const { handleError } = require('../utils')
module.exports = {
  createEvent
}


function createEvent (req, res) {
  EventsModel
    .create(req.body.newEvent)
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}