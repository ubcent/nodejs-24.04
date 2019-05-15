// mailchimp
const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'vasya@gmail.com',
    pass: '********',
  },
});

smtpTransport.sendMail({
  from: 'Vasya Pupkin <vasya@gmail.com>',
  to: 'Kolya Pupkin <kolya@pupkin.ru>, Ivan Pupkin <ivan@pupkin.ru>',
  subject: 'Приглашение на день рождения!',
  html: 'Дорогие <b>друзья</b>! Приходите на мой день рождения!',
}, (err, result) => {
  if(err) {
    console.log('Письмо не отправлено', err);
  } else {
    console.log('Письмо было успешно отправлено!');
  }
  smtpTransport.close();
});