const User = require('../models/user')
const Axios = require('axios')
const bcrypt = require('bcryptjs')
const {
  generateStr,
  confirmText,
  confirmHtml,
} = require('../../lib/confirmMail')
const mailer = require('../../lib/mailer')

module.exports = {
  signUp: async (req, res) => {
    console.log('controller signIn')
    try {
      console.log('CTRL SIGNUP USER DATA POSTED:', req.body)
      // We will check user from db here
      const email = req.body.email
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const password = req.body.password
      const recaptcha = req.body.recaptcha
      const accountType = req.body.accountType
      const locale = req.body.locale

      const gres = await Axios({
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        url: 'https://www.google.com/recaptcha/api/siteverify',
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: recaptcha,
        },
      })

      if (!gres.data.success || gres.data.score < 0.5) {
        return res.status(403).json({
          success: false,
          message: {
            tr: 'Lütfen Daha Sonra Tekrar Deneyiniz',
            en: 'Please Try Again Later.',
          },
        })
      }
      // User hesabı olup olmadıgı kontrol ediliyor
      const findUser = await User.findOne({ 'local.email': email })
      if (findUser) {
        return res.status(403).json({
          success: false,
          message: {
            tr:
              'Bu Email adresi ile zaten üyeliğiniz bulunmakta, giriş yapmayı deneyiniz veya Şifrenizi unuttuysanız yeni bir şifre isteyebilirsiniz',
            en:
              'Already have an account with this email, try to login or request new password',
          },
        })
      }

      const confirmStr = generateStr()
      const passChanged = new Date()

      const newUser = new User({
        name: { firstName, lastName },
        methods: ['local'],
        local: { email, password, confirmStr, passChanged },
        accountType,
        locale,
      })

      const text = confirmText(confirmStr, email, firstName, locale)
      const html = confirmHtml(confirmStr, email, firstName, locale)

      await mailer.sendEmail(
        process.env.APP_MAIL_EMAIL,
        email,
        'REGISTER',
        html,
        text
      )

      await newUser.save()

      res.status(200).json({ success: true })
    } catch (err) {
      console.error('Server Error:', err)
      res.status(400).json({
        success: false,
        message: {
          tr: err.response && err.response,
          en: err.response && err.response,
        },
      })
    }
  },

  user: async (req, res) => {
    // this controller only getting user info from cookie
    try {
      const user = req.session.get('user')
      console.log('CTRL USER REQUESTED SESSION USER:', user)
      if (user === undefined) {
        res.end()
        return
      }
      // Find user from db
      // Respond with user object

      res.status(200).json({
        success: true,
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
      })
    } catch (err) {
      console.error('Server Error')
    }
  },

  logOut: (req, res) => {
    console.log('Session Destroyed', req.session.get('user'))
    const user = req.session.get('user')
    if (user === undefined) {
      return res.json({ success: false, message: 'No User Session' }).end()
    }
    req.session.destroy()
    res.status(200).json({ success: true, message: 'Session Destroyed' })
  },

  verify: async (req, res, next) => {
    console.log('VERIFY POSTED DATA:', req.body)
    const { token } = req.body
    const user = await User.findOne({ 'local.confirmStr': token })
    console.log('USER FIND', user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: { tr: 'Kod Geçersiz', en: 'Code is not valid' },
      })
    }
    user.local.email_verified = true
    user.local.confirmStr = ''
    await user.save()

    req.session.set('user', {
      firstName: user.name.firstName,
      _id: user._id,
    })
    await req.session.save()
    return res.status(200).json({ success: true, ...user._doc })
  },
}
