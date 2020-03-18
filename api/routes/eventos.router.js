const router = require('express').Router()
const { authUser } = require('../utils')

const {
  createEvent
} = require('../controllers/eventos.controller')

router.post('/', authUser, createEvent)

module.exports = router