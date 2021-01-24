const User = require('../models/user')
const Axios = require('axios')
const {
  generateStr,
  confirmText,
  confirmHtml,
} = require('../../lib/confirmMail')
const { mailResetHtml, mailResetText } = require('../../lib/mailPassReset')
const {
  mailPassChangeHtml,
  mailPassChangeText,
} = require('../../lib/mailPassChange')
const mailer = require('../../lib/mailer')
const JWT = require('jsonwebtoken')

module.exports = {
  signUp: async (req, res) => {
    try {
      // We will check user from db here
      const email = req.body.email
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const name = `${firstName} ${lastName}`
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

      const text = confirmText(confirmStr, email, name, locale)
      const html = confirmHtml(confirmStr, email, name, locale)

      const subject = locale === 'tr' ? 'Üyelik Onayı' : 'Confirm Your Account'

      await mailer.sendEmail(
        process.env.APP_MAIL_EMAIL,
        email,
        subject,
        html,
        text
      )
      // sent a mail to site admin
      await mailer.sendEmail(
        process.env.APP_MAIL_EMAIL,
        process.env.APP_MAIL_EMAIL,
        `New User Register - ${name}`,
        html,
        text
      )
      await newUser.save()

      res.status(200).json({ success: true })
    } catch (err) {
      console.error('Server Error:', JSON.stringify(err))
      if (err.code === 'EENVELOPE') {
        return res.status(550).json({
          success: false,
          message: {
            tr: `E-posta alıcı hatası. Lütfen girmiş olduğunuz e-posta adresini kontrol ediniz`,
            en: `Recipient email address rejected. Please check email address input`,
          },
        })
      }
      res.status(400).json({
        success: false,
        message: {
          tr: err.response && err.response,
          en: err.response && err.response,
        },
      })
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email
      const password = req.body.password

      // Control if there is a user
      const user = await User.findOne({ 'local.email': email })
      if (!user)
        return res.status(404).json({
          success: false,
          message: {
            tr: 'Bilgileriniz eksik veya hatalı',
            en: "That's not match. Email  or password",
          },
        })
      // Control user password is matching
      const passMatch = await user.isValidPassword(password)
      console.log('PASSWORD MATCH', passMatch)
      if (!passMatch)
        return res.status(404).json({
          success: false,
          message: {
            tr: 'Bilgileriniz Yanlış veya Eksik',
            en: 'Sorry no match username or password',
          },
        })
      // Logging in User
      req.session.set('user', {
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        _id: user._id,
      })
      await req.session.save()

      res.status(200).json({ success: true })
    } catch (err) {
      console.error('LOGIN ERR: ', err)
      res.status(400).end()
    }
  },

  user: async (req, res) => {
    // this controller only getting user info from cookie
    try {
      const user = req.session.get('user')
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
        lastName: user.lastName,
        picture: user.picture,
        email: user.email,
      })
    } catch (err) {
      console.error('Server Error on Auth Control User...')
    }
  },

  logOut: (req, res) => {
    const user = req.session.get('user')
    if (user === undefined) {
      return res.json({ success: false, message: 'No User Session' }).end()
    }
    req.session.destroy()
    res.status(200).json({ success: true, message: 'Session Destroyed' })
  },

  verify: async (req, res, next) => {
    try {
      const { token } = req.body
      const user = await User.findOne({ 'local.confirmStr': token })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: {
            tr: 'Kod geçersiz, veya süresi dolmuş olabilir.',
            en: 'Code is not valid or can be expired.',
          },
        })
      }
      user.local.email_verified = true
      user.local.confirmStr = ''
      await user.save()

      req.session.set('user', {
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        _id: user._id,
      })
      await req.session.save()
      return res.status(200).json({ success: true })
    } catch (err) {
      console.error(err)
    }
  },
  reSentEmail: async (req, res) => {
    try {
      console.log(req.body)
      const email = req.body.email
      const user = await User.findOne({ 'local.email': email })
      console.log(user)
      if (!user)
        return res.status(404).json({
          success: false,
          message: {
            en: 'Sorry, no matching email',
            tr: 'Üzgünüz, girmiş olduğunuz eposta kaydı bulunmuyor.',
          },
        })

      if (!user.local.confirmStr) {
        return res.status(400).json({
          success: false,
          message: {
            en: 'Email already confirmed, can not confirm again',
            tr: 'Eposta doğrulanmış, tekrar doğrulanamaz.',
          },
        })
      }

      // Zaman Kontrol E-posta update süresi
      const dateNow = new Date()
      const timeDiff = Math.abs(dateNow - user.updated_at) / 20000
      const timeDiffCreate = Math.abs(dateNow - user.created_at) / 20000
      const timeTo = 20 - Math.floor(timeDiff)
      // At least ten min later then first create and update
      if (timeDiff < 10 && timeDiffCreate < 10) {
        return res.status(406).json({
          success: false,
          message: {
            en: `We already sent an email to you. Please try ${timeTo} minutes later again`,
            tr: `Zaten biraz önce bir eposta gönderildi. ${timeTo} dk. sonra tekrar deneyiniz`,
          },
        })
      }
      // Tekrar confirmasyon Oluşturma
      const confirmStr = generateStr()
      user.local.confirmStr = confirmStr

      const firstName = user.name.firstName
      const lastName = user.name.lastName
      const name = `${firstName} ${lastName}`
      const locale = user.locale

      const text = confirmText(confirmStr, email, name, locale)
      const html = confirmHtml(confirmStr, email, name, locale)
      const subject =
        user.locale === 'tr' ? 'EPOSTA DOĞRULAMA' : 'REGISTER EMAIL'

      await mailer.sendEmail(
        process.env.APP_MAIL_EMAIL,
        email,
        subject,
        html,
        text
      )

      await user.save()
      return res.status(200).json({
        success: true,
        message: {
          en: 'We sent a new confirmation email',
          tr: 'Yeni bir doğrulama Kodu Gönderilmiştir',
        },
      })
    } catch (err) {
      console.error(err)
      res.status(400).json({
        success: false,
        message: {
          tr: 'Girmiş olduğunuz bilgileri kontrol ediniz, bir hata oluştu',
          en: 'Please check your inputs, An error accured',
        },
      })
    }
  },
  forget: async (req, res, next) => {
    try {
      console.log(req.body)
      const email = req.body.email
      const user = await User.findOne({ 'local.email': email })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: {
            en: 'No user email match',
            tr: 'Kullanıcı kaydı bulunamadı',
          },
        })
      }
      if (!user.local.email_verified) {
        return res.status(404).json({
          success: false,
          message: {
            en: 'Email must be verified before pass reset.',
            tr: 'E-posta doğrulanmadan, sıfırlama yapılamıyor',
          },
        })
      }
      // If Already reset Token End
      // if (user.local.resetPassToken) {
      //  return res.status(403).json({
      //    success: false,
      //    message: {
      //      en: 'You already reset your password. Please check your email',
      //      tr:
      //        'Şifre sıfırlama işleminiz devam ediyor. Lütfen e-postanızı kontrol ediniz.',
      //    },
      //  })
      // }

      const token = JWT.sign(
        {
          iss: 'makinatr',
          sub: user._id,
          iat: new Date().getTime(),
          exp: Math.floor(Date.now() / 1000) + 30 * 60,
        },
        process.env.JWT_SECRET
      )
      user.local.resetPassToken = token

      const firstName = user.name.firstName
      const lastName = user.name.lastName
      const userName = `${firstName} ${lastName}`
      const locale = user.locale
      const subject =
        user.locale === 'tr' ? 'Şifre Sıfırlama' : 'Password Reset'

      const text = mailResetText(token, email, userName, locale)
      const html = mailResetHtml(token, email, userName, locale)

      await mailer.sendEmail(
        process.env.APP_MAIL_EMAIL,
        email,
        subject,
        html,
        text
      )

      await user.save()
      res.status(200).json({
        success: true,
        message: {
          tr: `${email} e-postanıza  sıfırlama linki gönderilmiştir.`,
          en: `Your reset link was sent to ${email}`,
        },
      })
      console.log('USER', user)
    } catch (err) {
      console.error(err)
    }
  },
  reset: async (req, res, next) => {
    try {
      console.log(req.body)
      const password = req.body.password
      const token = req.body.token

      const decode = JWT.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decode.sub)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: {
            en: 'No matching User',
            tr: 'Üzgünüz kullanıcı kaydı bulunamadı',
          },
        })
      }
      const match = token === user.local.resetPassToken
      if (!match) {
        return res.status(404).json({
          success: false,
          message: {
            en: 'Invalid Identity. try to request a new pass reset',
            tr: 'Kimlik geçersiz. Yeniden şifre sıfırlama isteyiniz.',
          },
        })
      }

      // Sent Email to User
      const locale = user.locale
      const userName = `${user.name.firstName} ${user.name.lastName}`
      const email = user.local.email
      const text = mailPassChangeText(userName, locale)
      const html = mailPassChangeHtml(userName, locale)

      const subject =
        locale === 'tr' ? 'Şifre Değiştirme' : 'Your Password Updated'

      await mailer.sendEmail(
        process.env.APP_MAIL_EMAIL,
        email,
        subject,
        html,
        text
      )

      user.local.password = password
      user.local.resetPassToken = ''
      await user.save()

      res.status(200).json({
        success: true,
        message: {
          tr: 'Şifreniz değiştirilmiştir. Lütfen giriş yapınız',
          en: 'Your password updated, Please login',
        },
      })
    } catch (err) {
      console.error(JSON.stringify(err))
      if (err.name === 'JsonWebTokenError')
        return res.status(500).json({
          success: false,
          message: {
            tr: 'Hatalı veya Geçersiz link Kullandınız.',
            en: 'Reset link is not valid or wrong',
          },
        })
      if (err.name === 'TokenExpiredError') {
        // find user and delete token
        return res()
          .status(500)
          .json({
            success: false,
            message: {
              tr: 'Sıfırlama linkinizin süresi dolmuş.',
              en: 'Reset link expired',
            },
          })
      }
    }
  },
  fbAuth: async (req, res, next) => {
    console.log("USER", req.user)
    const user = req.user
    console.log("SESION", JSON.stringify(req.session))
    req.session.set('user', {
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      picture: user.facebook.picture,
      _id: user._id,
    })
    await req.session.save()
    res.redirect("/")
  },
  inAuth: async (req, res, next) => {
    console.log("USER CONTROLLER LINKEDIN", req.user)
    const user = req.user
    req.session.set('user', {
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      picture: user.linkedin.picture,
      _id: user.id,
    })
    await req.session.save()
    res.redirect("/")
  }
}
