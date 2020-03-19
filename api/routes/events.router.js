const router = require('express').Router()
const { authUser } = require('../utils')

const {
  createEvent,
  showEvent,
  updateTaskStatus
} = require('../controllers/events.controller')

router.post('/', createEvent)
router.get('/:userId', showEvent)
router.patch('/:userId', updateTaskStatus)

module.exports = router
