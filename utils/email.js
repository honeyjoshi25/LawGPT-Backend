const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (sendTo, subject, msgBody) => {
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: sendTo,
    // cc: "",
    subject: subject,
    text: msgBody,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
