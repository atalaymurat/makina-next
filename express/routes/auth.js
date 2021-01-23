const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const ironSession = require('next-iron-session').ironSession
const User = require('../models/user')

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      profileFields: ['id', 'photos', 'email', 'first_name', 'last_name'],
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/fb/cb`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('FB PASS REQ', profile)
        const email = profile.emails[0].value
        console.log('Email to Seaerch DB..', email)

        const registeredUser = await User.findOne({ 'facebook.id': profile.id })
        // Already registered with fb id
        if (registeredUser) return done(null, registeredUser)

        const user = await User.findOne({ 'local.email': email })
        // we find user has same email local account
        if (user) {
          user.methods.push('facebook')
          user.facebook = {
            id: profile.id,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          }
          await user.save()
          return done(null, user)
        }
        const newUser = new User({
          methods: ['facebook'],
          name : { firstName: profile.name.givenName|| "", lastName: profile.name.familyName || "" },
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          },
        })
        console.log("NEW USER CREATED:", newUser)
        await newUser.save()
        return done(null, newUser)
      } catch (err) {
        console.error(err)
        return done(err, false, err.message)
      }
    }
  )
)

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
router.post('/resent', authController.reSentEmail)
router.post('/forget', authController.forget)
router.post('/reset', authController.reset)
router.get('/fb', passport.authenticate('facebook')).get(
  '/fb/cb',

  passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false,
  }),
  session,
  authController.fbAuth
)

module.exports = router
