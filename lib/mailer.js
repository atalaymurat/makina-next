const nodemailer = require('nodemailer')

//  mail configuration
const transport = nodemailer.createTransport({
  host: process.env.APP_MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_MAIL_USER,
    pass: process.env.APP_MAIL_PASS,
  },
})

// SENDGRID MAIL CONF
// const transport = nodemailer.createTransport({
// service: 'SendGrid',
// auth: {
//   user: process.env.APP_SENDGRID_USER,
//   pass: process.env.APP_SENDGRID_PASS,
//  },
//  tls: {
//   rejectUnauthorized: false,
//  },
// })

module.exports = {
  sendEmail(from, to, subject, html, text) {
    return new Promise((resolve, reject) => {
      transport.sendMail(
        {
          from,
          to,
          subject,
          text,
          html,
          list: {
            unsubscribe: process.env.APP_MAIL_UNSUBSCRIBE,
          },
        },
        (err, info) => {
          if (err) reject(err)

          resolve(info)
        }
      )
    })
  },
}
