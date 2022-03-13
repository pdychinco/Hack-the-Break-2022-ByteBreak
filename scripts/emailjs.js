var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host : smtp.gmail.com,
  service: 'gmail',
  auth: {
    user: 'doyourecall.noreply@gmail.com',
    pass: 'hackthebreak2022'
  }
});

var mailOptions = {
  from: 'doyourecall.noreply@gmail.com',
  to: 'i_datayan@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});