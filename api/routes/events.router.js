const router = require('express').Router()
const { authUser } = require('../utils')

const {
  createEvent
} = require('../controllers/events.controller')

router.post('/', createEvent)

module.exports = router
