const express = require('express')
const router = express.Router()
const imagesController = require('../controllers/images')
const ironSession = require('next-iron-session').ironSession
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../tmp/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '_' + file.fieldname )
  },
})

const upload = multer({
  storage,
  limits: { filesize: 20 * 1024 * 1024 },
})

const session = ironSession({
  cookieName: process.env.APP_COOKIE_NAME,
  password: process.env.APP_SESSION_SECRET,
  cookieOptions: {
    // the next line allows to use the session in non-https environements
    secure: process.env.NODE_ENV === 'production',
  },
})

// /api/images/-----  */
router.get('/', imagesController.index)
router.post('/upload', session, upload.single('image'), imagesController.create)

module.exports = router
