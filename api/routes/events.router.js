const router = require('express').Router()
const { authUser } = require('../utils')

const {
  createEvent,
  showEvent
} = require('../controllers/events.controller')

router.post('/', createEvent)
router.get('/:userId', showEvent)

module.exports = router
