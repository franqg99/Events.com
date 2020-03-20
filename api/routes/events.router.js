const router = require('express').Router()

const {
  createEvent,
  showEvent,
  updateTaskStatus,
  //deleteTask,
  //addTask
} = require('../controllers/events.controller')

router.post('/', createEvent)
router.get('/:userId', showEvent)
router.put('/:eventId/tasks/:taskId', updateTaskStatus)
//router.delete('/:eventId/tasks/:taskId', deleteTask)
//router.post('/:eventId/tasks', addTask)

module.exports = router
