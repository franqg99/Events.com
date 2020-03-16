const router = require('express').Router()
const { authUser } = require('../utils') // Authenticated Route

const {
  getAllTodos,
  updateTodo,
  deleteTodo,
  createTodo
} = require('../controllers/todos.controller')

router.get('/', authUser, getAllTodos)
router.post('/', authUser, createTodo)
router.put('/:id', authUser, updateTodo)
router.delete('/:id', authUser, deleteTodo)

module.exports = router
