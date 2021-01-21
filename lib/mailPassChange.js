const mailPassChangeHtml = (userName, locale) => {
  let mail = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="color: #757575; background-color: transparent;"
>
  <head>
    <title>Şifreniz Değiştirildi</title>
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        color: #212121;
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
  <body
    style="
      overflow: auto;
      padding: 0;
      margin: 0;
      cursor: auto;
      background-color: transparent;
    "
  >
    <hr style="margin: 10px 0;" />
    <div>
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="90%"
        bgcolor="#ececec"
        style="margin-right: auto; margin-left: auto;"
      >
        <tr>
          <td style="padding: 10px; color: #212121;">
            <strong
              class="brand"
              style="
                text-align: left;
                letter-spacing: -1.7px;
                font-family: Futura, Arial, Helvetica, sans-serif;
                font-size-adjust: 0.6px;
                font-size: 35px;
                margin-top: 10px;
              "
            >
              ${process.env.NEXT_PUBLIC_SITE_NAME}
            </strong>
          </td>
        </tr>
        <tr>
          <td
            style="
              width: 70%;
              color: #212121;
              padding: 12px;
              background-color: transparent;
            "
          >
            <h1 style="text-align: center;">
              <b>Merhaba, ${userName}</b>
            </h1>
              <p>Şifre değiştirilme bilgilendirmeniz</p>
            <div style="text-align: left;">
              <p style="font-weight: 500; font-size: 18px; line-height: 24px;">
                Şifreniz değiştirilmiştir. Eğer değiştirilme işlemi sizin tarafınızdan yapılmadıysa, lütfen bizimle iletişime geçiniz.
              </p>
            </div>
            <hr style="margin: 10px 0;" />
            <p style="text-align: center; font-weight: 500;">
            ${process.env.NEXT_PUBLIC_SITE_NAME} ekibi sizi aramızda görmekten mutluluk duyar. Görüş ve
              istekleriniz ile ilgili bize e-posta yazabilirsiniz. Sizlerden gelecek bildirimler bizim için büyük önem arzetmektedir.
            </p>
            <hr style="margin: 10px 0;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: transparent; padding: 10px;">
            <address
              style="font-size: 12px; line-height: 16px; font-style: normal;"
            >
              <p style="text-align: center; font-weight: 500;">
                &#xA9; 2020 ${process.env.NEXT_PUBLIC_ADDRESS}
              </p>
              <p style="text-align: center; font-weight: 500;">
                İstanbul, Türkiye
              </p>
            </address>
            <p style="text-align: center; font-size: 12px; line-height: 16px;">
              Servis Kullanım Koşulları | Gizlilik Politikası
            </p>
            <p style="text-align: center; font-size: 12px; line-height: 16px;">
              Instagram | Facebook | LinkedIn
            </p>
          </td>
        </tr>
      </table>
    </div>
    <hr style="margin: 10px 0;" />
  </body>
</html>
  `
  let mailEn = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="color: #757575; background-color: transparent;"
>
  <head>
    <title>Your Password Updated</title>
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        color: #212121;
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
  <body
    style="
      overflow: auto;
      padding: 0;
      margin: 0;
      cursor: auto;
      background-color: transparent;
    "
  >
    <hr style="margin: 10px 0;" />
    <div>
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="90%"
        bgcolor="#ececec"
        style="margin-right: auto; margin-left: auto;"
      >
        <tr>
          <td style="padding: 10px; color: #212121;">
            <strong
              class="brand"
              style="
                text-align: left;
                letter-spacing: -1.7px;
                font-family: Futura, Arial, Helvetica, sans-serif;
                font-size-adjust: 0.6px;
                font-size: 35px;
                margin-top: 10px;
              "
            >
              ${process.env.NEXT_PUBLIC_SITE_NAME}
            </strong>
          </td>
        </tr>
        <tr>
          <td
            style="
              width: 70%;
              color: #212121;
              padding: 12px;
              background-color: transparent;
            "
          >
            <h1 style="text-align: center;">
              <b>Hi, ${userName}</b>
            </h1>
              <p>Your password update information</p>
            <div style="text-align: left;">
              <p style="font-weight: 500; font-size: 18px; line-height: 24px;">
              Your password has been updated. if you did not change your password, please contuct with us.
              </p>
            </div>
            <hr style="margin: 10px 0;" />
            <p style="text-align: center; font-weight: 500;">
              ${process.env.NEXT_PUBLIC_SITE_NAME} team glads to see you in our organization.
            </p>
            <hr style="margin: 10px 0;" />
          </td>
        </tr>
        <tr>
          <td style="background-color: transparent; padding: 10px;">
            <address
              style="font-size: 12px; line-height: 16px; font-style: normal;"
            >
              <p style="text-align: center; font-weight: 500;">
                &#xA9; 2020 ${process.env.NEXT_PUBLIC_ADDRESS}
              </p>
              <p style="text-align: center; font-weight: 500;">
                İstanbul, Turkey
              </p>
            </address>
            <p style="text-align: center; font-size: 12px; line-height: 16px;">
            User Agreement | Privacy Policy
            </p>
            <p style="text-align: center; font-size: 12px; line-height: 16px;">
              Instagram | Facebook | LinkedIn
            </p>
          </td>
        </tr>
      </table>
    </div>
    <hr style="margin: 10px 0;" />
  </body>
</html>
`
  if (locale === 'tr') return mail
  else return mailEn
}

const mailPassChangeText = (token, email, userName, locale) => {
  let text = `
  Merhaba, ${userName}

  Şifreniz değiştirilmiştir. Eğer değiştirilme işlemi sizin tarafınızdan gerçekleştirilmediyse, lütfen bizimle iletişime geçiniz.

${process.env.NEXT_PUBLIC_SITE_NAME} ekibi sizi aramızda görmekten mutluluk duyar. Görüş ve istekleriniz ile ilgili bize e-posta yazabilirsiniz. Sizlerden gelecek bildirimler bizim için büyük önem arzetmektedir.

© 2020 ${process.env.NEXT_PUBLIC_ADDRESS}
İstanbul, Türkiye
  `
  let textEn = `
  Hi, ${userName}

  Your password has been updated. if you did not change your password, please contuct with us.

${process.env.NEXT_PUBLIC_SITE_NAME} team glads to see you in our organization.

© 2020 ${process.env.NEXT_PUBLIC_ADDRESS}
İstanbul, Türkiye
  `
  if (locale === 'tr') return text
  else return textEn
}

module.exports = { mailPassChangeHtml, mailPassChangeText }
