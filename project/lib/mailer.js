require('dotenv').config();

const nodemailer = require('nodemailer');
const events = require('events');

<<<<<<< HEAD
module.exports = (receiveEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    host: 'smtp.office365.com',
    port: 587,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: 'toshevaivana@outlook.com',
    pass: '070233821*'
  }
});

const sendMail = (data) => {
  
  const email = {
    from: 'toshevaivana@outlook.com',
    to: `${data.to}`,
    subject: `${data.subject}`,
    text: `${data.text}`
  };
  
  transporter.sendMail(email, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:');
=======
const sendMail = (receiverMail, postTitle, postContent) => { 

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
>>>>>>> No recepient problem solved
    }
  });
}

<<<<<<< HEAD
emitter
.on('blogPost_created', data => {
  sendMail(data);
})

emitter.emit('blogPost_created', {
  from: 'toshevaivana@outlook.com',
  to: `${receiveEmail}`,
  subject: 'New blog post!',
  text: 'This is content for the blog post created event.'
})
}
=======
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
>>>>>>> No recepient problem solved
