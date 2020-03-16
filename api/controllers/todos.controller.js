const TodoModel = require('../models/todos.model')
const { handleError } = require('../utils')

module.exports = {
  getAllTodos,
  updateTodo,
  deleteTodo,
  createTodo
}

function getAllTodos (req, res) {
  TodoModel
    .find({ user: res.locals.user._id })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function createTodo (req, res) {
  TodoModel
    .create({ user: res.locals.user._id, task: req.body.todo })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function deleteTodo (req, res) {
  TodoModel
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handleError(err, res))
}

function updateTodo (req, res) {
  TodoModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}
