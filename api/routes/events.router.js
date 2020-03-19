const router = require('express').Router()

const {
  createEvent,
  showEvent,
  updateTaskStatus
} = require('../controllers/events.controller')

router.post('/', createEvent)
router.get('/:userId', showEvent)
router.put('/:eventId/:taskIdx', updateTaskStatus)

module.exports = router
