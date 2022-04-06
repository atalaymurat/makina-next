const express = require('express')
const router = express.Router()
const brandsController = require('../controllers/brands')


router
  .get('/', brandsController.index)
  .post('/', brandsController.create)
  .patch('/:id', brandsController.update)
  .delete('/:id', brandsController.destroy)

module.exports = router
