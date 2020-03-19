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
    .findByIdAndUpdate({ _id: req.params.eventId })
    .then(event => {
      if (event.length === 0) return res.json({ err: 'event not found' })
      event.event.tasks[req.params.taskIdx].status = !event.event.tasks[req.params.taskIdx].status
      event.save()
        .then(response => res.json(response))
        .catch((err) => handleError(err, res))
    })
    .catch((err) => handleError(err, res))
}
