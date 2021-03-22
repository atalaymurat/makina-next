const express = require('express')
const router = express.Router()
const usedController = require('../controllers/used')
const ironSession = require('next-iron-session').ironSession

const session = ironSession({
  cookieName: process.env.APP_COOKIE_NAME,
  password: process.env.APP_SESSION_SECRET,
  cookieOptions: {
    // the next line allows to use the session in non-https environements
    secure: process.env.NODE_ENV === 'production',
  },
})


router
  .get('/', usedController.index)
  .get('/:id', usedController.show)
  .post('/:id', session, usedController.update)

  module.exports = router