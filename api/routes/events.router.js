const router = require('express').Router()

const {
  createEvent,
  showEvent,
  updateTaskStatus
} = require('../controllers/events.controller')

router.post('/', createEvent)
router.get('/:userId', showEvent)
router.put('/:eventId/tasks/:taskId', updateTaskStatus)

module.exports = router
