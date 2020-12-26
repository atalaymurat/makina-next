const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  return res.status(200).json({ success: true, message: 'PASS' })
})

router.get('/index', (req, res) => {
  res.status(200).json({ success: true, message: 'READY..' })
})

module.exports = router
