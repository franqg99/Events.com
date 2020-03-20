const EventsModel = require('../models/events.model')
const { handleError } = require('../utils')
module.exports = {
  createEvent,
  showEvent,
  updateTaskStatus,
  deleteTask,
  addTask
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

function deleteTask (req, res) {
  EventsModel
    .findById(req.params.eventId)
    .then(event => {
      event.tasks.id(req.params.taskId).remove()
      event.save()
        .then(response => res.json(response))
        .catch((err) => handleError(err, res))
    })
    .catch((err) => handleError(err, res))
}

function addTask (req, res) {
  EventsModel
    .findById(req.params.eventId)
    .then(event => {
      if (event.length === 0) return res.json('Event not found')
      event.tasks.push(req.body.newTask)
      event.save()
        .then(response => res.json(response))
        .catch(err => handleError(err, res))
    })
    .catch(err => handleError(err, res))
}
