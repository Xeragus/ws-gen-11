const nodemailer = require('nodemailer');
const events = require('events');
const emitter = new events.EventEmitter();

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
    }
  });
}

emitter
.on('blogPost_created', data => {
  sendMail(data);
})

emitter.emit('blogPost_created', {
  from: 'toshevaivana@outlook.com',
  to: `${receiveEmail}`,
  subject: 'Reset Password!',
  text: 'Click on the link to reset the password: localhost:3003/api/v1/auth/reset-password',
})
}