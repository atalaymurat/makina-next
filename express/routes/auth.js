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
// api/auth/[...]
// Get User Data
router.get('/user', session, authController.user)
// End User Session
router.post('/logout', session, authController.logOut)
// Verify User Email
router.post('/verify', session, authController.verify)
// User Login
router.post('/login', session, authController.login)

//Unprotected Routes
router.post('/signup', authController.signUp)
router.post('/resent', authController.reSentEmail )
router.post('/forget', authController.forget )

module.exports = router
