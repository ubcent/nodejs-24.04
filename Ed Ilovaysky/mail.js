
// npm i nodemailer require
// mailchipm служба платная..
const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'edilovaysky@gmail.com',
        pass: '***********'
    },
});

smtpTransport.sendMail({
    from: 'Ed Ilovaysky <edilovaysky@gmail.com>',
    to: 'kolya<kilay@pupkin.ru>, vasya<vasya@pupkin.ru>',
    subject: 'Приглашение',
    //text: 'Приглашаем на курсы по программированию',
    html: '<h1>Приглашаем</h1><p>на курсы по программированию</p>'
}, (err, result) => {
    if (err) {
        console.log('mail wasn\'t send', err);
    } else {
        console.log('mail was send');
    }
    smtpTransport.close();
});