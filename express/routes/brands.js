const express = require('express')
const router = express.Router()
const brandsController = require('../controllers/brands')
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
  .get('/', brandsController.index)
  .post('/', session, brandsController.create)
  .patch('/:id', session, brandsController.update)
  .delete('/:id', session, brandsController.destroy)

module.exports = router
