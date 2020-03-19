const EventsModel = require('../models/events.model')
const { handleError } = require('../utils')
module.exports = {
  createEvent,
  showEvent,
  updateTaskStatus
}

function createEvent (req, res) {
  EventsModel
    .create(req.body.newEvent)
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function showEvent (req, res) {
  EventsModel
    .find({ owner: req.params.userId })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function updateTaskStatus (req, res) {
  EventsModel
    .update(
      { _id: req.params.eventId, 'tasks._id': req.params.taskId },
      { $set: { 'tasks.$.status': req.body.status } })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}
