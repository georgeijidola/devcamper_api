const sgMail = require("@sendgrid/mail")
const ErrorResponse = require("./errorResponse")
require("dotenv").config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async ({ to, from, subject, message, next }) => {
  const mailObject = {
    to,
    from,
    subject,
    html: `<body><p>${message}</p></body>`,
  }

  await sgMail.send(mailObject)
}

module.exports = sendMail
