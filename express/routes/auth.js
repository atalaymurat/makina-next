const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const ironSession = require('next-iron-session').ironSession

const session = ironSession({
  cookieName: process.env.APP_COOKIE_NAME,
  password: process.env.APP_SESSION_SECRET,
  cookieOptions: {
    // the next line allows to use the session in non-https environements
    secure: process.env.NODE_ENV === 'production',
  },
})

// User Authentication Routes
// Set User Session
router.post('/signup', session, authController.signUp)
// Get User Data
router.get('/user', session, authController.user)
// End User Session
router.post('/logout', session, authController.logOut)

module.exports = router
