require('dotenv').config();

const nodemailer = require('nodemailer');
const events = require('events');

const sendMail = (receiverMail, postTitle, postContent) => { 

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    }
  });


  const options = {
      from: process.env.SENDER_EMAIL,
      to: `${receiverMail}`,
      subject: `${postTitle}`,
      text: `${postContent}`
    }

    transporter.sendMail(options, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent successfully');
      }
    });
  }

module.exports = sendMail
