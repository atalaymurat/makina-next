const randomString = require('randomstring')

const generateStr = () => {
  const str = randomString.generate({
    length: 6,
    charset: 'hex',
  })
  return str
}

const confirmHtml = (newStr, email, name, locale) => {
  console.log('Gelen email', email)

  let mail = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="color: #757575;background-color: transparent;">
  <head>
    <title>Doğrulama Kodu</title>
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
      html {
        background-color: transparent !important;
        color: #212121;
        font-family: Roboto, sans-serif;
      }
      hr {
        border-top: 1px solid transparent;
        unicode-bidi: isolate;
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        margin-inline-start: auto;
        margin-inline-end: auto;
        overflow: hidden;
      }
      table {
        font-size: 14px;
        line-height: 20px;
        background-color: transparent;
      }
      a {
        color: #212121
      }
      address {
        font-size: 12px;
        line-height: 16px;
        font-style: normal;
      }
      p {
        font-weight: 500;
      }
    </style>
  </head>
  <body style="
      overflow: auto;
      padding: 0;
      margin: 0;
      cursor: auto;
      background-color: transparent;
    ">
    <hr style="margin: 10px 0;">
    <div>
      <table cellspacing="0" cellpadding="0" border="0" width="90%" bgcolor="#ececec" style="margin-right: auto;margin-left: auto">
        <tr>
          <td style="padding: 10px; color: #212121;">
            <strong class="brand" style="
                text-align: left;
                letter-spacing: -1.7px;
                font-family: Futura, Arial, Helvetica, sans-serif;
                font-size-adjust: 0.6px;
                font-size: 35px;
                margin-top: 10px;
              ">
              makinaTr
            </strong>
          </td>
        </tr>
        <tr>
          <td style="
              width: 70%;
              color: #212121;
              padding: 12px;
              background-color: transparent;
            ">
            <h1 style="text-align: center;">
              <b>Hoşgeldiniz,</b>
            </h1>
            <div style="text-align: center;">
              <p style="
              font-weight: 500;
              font-size: 18px;
              line-height: 24px;
              ">
                Merhaba <b> ${name.toUpperCase()}</b>, lütfen
                hesabınızı onaylamak için e-postanızı doğrulayınız.
              </p>
            </div>
            <hr style="margin: 10px 0;">
            <p style="text-align: left;font-weight: 500;">Bu kodu kullanarak doğrulayın.</p>
            <div style="
                margin-right: auto;
                margin-left: auto;
                width: 65%;
                border: 1px solid #757575;
                background-color: transparent;
                color: #212121;
                border-radius: 12px;
                font-size: 26px;
                line-height: 30px;
              ">
              <p style="text-align: center;font-weight: 500;">${newStr}</p>
            </div>
            <br>
            <p style="text-align: left;font-weight: 500;">
              Diğer bir seçenek link'ten doğrulayabilirsiniz, veya link sizin
              için çalışmıyor ise, kopyalayıp, internet tarayıcınızın adress
              satırına yapıştırabilirsiniz.
            </p>
            <p style="text-align: left;font-weight: 500;">
              <a style="color: #1975FF;" href="${
                process.env.NEXT_PUBLIC_BASE_URL
              }/confirmation/${newStr}">${
    process.env.NEXT_PUBLIC_BASE_URL
  }/confirmation/${newStr}
            </a></p>
            <hr style="margin: 10px 0;">
            <p style="text-align: center;font-weight: 500;">
              makinaTr ekibi sizi aramızda görmekten mutluluk duyar.
            </p>
            <hr style="margin: 10px 0;">
          </td>
        </tr>
        <tr>
          <td style="background-color: transparent; padding: 10px;">
            <address style="font-size: 12px;line-height: 16px; font-style: normal;">
              <p style="text-align: center;font-weight: 500;">
                &#xA9; 2021 makinaTr - Sancaktepe, 34885
              </p>
              <p style="text-align: center;font-weight: 500;">İstanbul, Türkiye</p>
            </address>
            <p style="text-align: center;font-size: 12px;line-height: 16px;">
              Servis Kullanım Koşulları | Gizlilik Politikası
            </p>
            <p style="text-align: center;font-size: 12px;line-height: 16px;">
              Instagram | Facebook | LinkedIn
            </p>
          </td>
        </tr>
      </table>
    </div>
    <hr style="margin: 10px 0;">
  </body>
</html>
    `
  let mailEn = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="color: #757575;background-color: transparent;">
    <head>
      <title>Verification Code</title>
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style type="text/css">
        html {
          background-color: transparent !important;
          color: #212121;
          font-family: Roboto, sans-serif;
        }
        hr {
          border-top: 1px solid transparent;
          unicode-bidi: isolate;
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
          margin-inline-start: auto;
          margin-inline-end: auto;
          overflow: hidden;
        }
        table {
          font-size: 14px;
          line-height: 20px;
          background-color: transparent;
        }
        a {
          color: #212121
        }
        address {
          font-size: 12px;
          line-height: 16px;
          font-style: normal;
        }
        p {
          font-weight: 500;
        }
      </style>
    </head>
    <body style="
        overflow: auto;
        padding: 0;
        margin: 0;
        cursor: auto;
        background-color: transparent;
      ">
      <hr style="margin: 10px 0;">
      <div>
        <table cellspacing="0" cellpadding="0" border="0" width="90%" bgcolor="#ececec" style="margin-right: auto;margin-left: auto">
          <tr>
            <td style="padding: 10px; color: #212121;">
              <strong class="brand" style="
                  text-align: left;
                  letter-spacing: -1.7px;
                  font-family: Futura, Arial, Helvetica, sans-serif;
                  font-size-adjust: 0.6px;
                  font-size: 35px;
                  margin-top: 10px;
                ">
                makinaTr
              </strong>
            </td>
          </tr>
          <tr>
            <td style="
                width: 70%;
                color: #212121;
                padding: 12px;
                background-color: transparent;
              ">
              <h1 style="text-align: center;">
                <b>Welcome,</b>
              </h1>
              <div style="text-align: center;">
                <p style="
                font-weight: 500;
                font-size: 18px;
                line-height: 24px;
                ">
                  Hi, <b> ${name.toUpperCase()}</b>, please confirm your email to activate your account.
                </p>
              </div>
              <hr style="margin: 10px 0;">
              <p style="text-align: left;font-weight: 500;">You can verify your account by using this code</p>
              <div style="
                  margin-right: auto;
                  margin-left: auto;
                  width: 65%;
                  border: 1px solid #757575;
                  background-color: transparent;
                  color: #212121;
                  border-radius: 12px;
                  font-size: 26px;
                  line-height: 30px;
                ">
                <p style="text-align: center;font-weight: 500;">${newStr}</p>
              </div>
              <br>
              <p style="text-align: left;font-weight: 500;">
                Altarnate you can confirm by clicking this link. If the link is not working for you, you can copy the link and paste it to your browsers address line.
              </p>
              <p style="text-align: left;font-weight: 500;">
                <a style="color: #1975FF;" href="${
                  process.env.NEXT_PUBLIC_BASE_URL
                }/en/confirmation/${newStr}">${
    process.env.NEXT_PUBLIC_BASE_URL
  }/en/confirmation/${newStr}
              </a></p>
              <hr style="margin: 10px 0;">
              <p style="text-align: center;font-weight: 500;">
                makinaTr team glads to see you in our organization
              </p>
              <hr style="margin: 10px 0;">
            </td>
          </tr>
          <tr>
            <td style="background-color: transparent; padding: 10px;">
              <address style="font-size: 12px;line-height: 16px; font-style: normal;">
                <p style="text-align: center;font-weight: 500;">
                  &#xA9; 2021 makinaTr - Sancaktepe, 34885
                </p>
                <p style="text-align: center;font-weight: 500;">İstanbul, Turkey</p>
              </address>
              <p style="text-align: center;font-size: 12px;line-height: 16px;">
                User Agreement | Privacy Policy
              </p>
              <p style="text-align: center;font-size: 12px;line-height: 16px;">
                Instagram | Facebook | LinkedIn
              </p>
            </td>
          </tr>
        </table>
      </div>
      <hr style="margin: 10px 0;">
    </body>
  </html>
      `

  if (locale === 'tr') return mail
  else return mailEn
}

//Send the verification email
const confirmText = (newStr, email, name, locale) => {
  let text = `
  Hoşgeldiniz,
  Merhaba ${name.toUpperCase()},
  lütfen hesabınızı onaylamak için e-postanızı doğrulayınız.

  Bu kodu kullanarak doğrulayın.
  ---------------------------------------------
  Kod : ${newStr}
  ---------------------------------------------
  Diğer bir seçenek link'ten doğrulayabilirsiniz, veya link sizin için çalışmıyor ise, kopyalayıp, internet tarayıcınızın adress satırına yapıştırabilirsiniz.

  link : ${process.env.NEXT_PUBLIC_BASE_URL}/confirmation/${newStr}

  makinaTr ekibi sizi aramızda görmekten mutluluk duyar.

  &copy 2021 makinaTr - Sancaktepe, 34885
  İstanbul, Türkiye
  Servis Kullanım Koşulları | Gizlilik Politikası | İletişim
  İnstagram | Facebook | LinkedIn
  `
  let textEn = `
  Welcome,
  Hi, ${name.toUpperCase()},
  please confirm your email to activate your account.

  You can verify your account by using this code
  ---------------------------------------------
  Code : ${newStr}
  ---------------------------------------------
  Altarnate you can confirm by clicking this link. If the link is not working for you, you can copy the link and paste it to your browsers address line.

  link : ${process.env.NEXT_PUBLIC_BASE_URL}/confirmation/${newStr}

  makinaTr team glads to see you in our organization

  &copy 2021 makinaTr - Sancaktepe, 34885
  İstanbul, Turkey
  User Agreement | Privacy Policy
  Instagram | Facebook | LinkedIn
  `
  if (locale === 'tr') return text
  else return textEn
}

module.exports = { generateStr, confirmText, confirmHtml }
