const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')
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
  .get('/', categoriesController.index)
  .get('/tree', categoriesController.tree)
  .get('/:name', categoriesController.show)
  .post('/', categoriesController.create)
  .patch('/:id', categoriesController.update)
  .delete('/:id', categoriesController.destroy)

module.exports = router
