const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport( {
    service: 'Mail.Ru',
    auth: {
        user: '@mail.ru',
        pass: '******',

    }
});
let mailHtml = '<div style="background-color:white">\n' +
    '    <div style="width:700px;margin:0px auto">\n' +
    '        <div style="width:450px;margin:0px auto 15px;text-align:center;font-family:verdana,tahoma,arial;font-size:11px" width="450" align="center">\n' +
    '          <a style="color:#b7afaf" href="http://web-ptica.ru/VRV-files/rassylka/10/index2.html" target="_blank">Нажмите здесь</a>, если письмо отображается некорректно.\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '<div style="margin-top:40px;width:700px;text-align:center;font-family:verdana,tahoma,arial;font-size:30px;color:#e30613;font-weight:bold;">\n' +
    'Акция «Перезагрузка»\n' +
    '</div>\n' +
    ' <div style="margin-top:30px; width:700px;text-align:center;font-family:verdana,tahoma,arial;font-size:18px;color:#000000;font-weight:bold;">\n' +
    ' Вы уже были клиентом компании Virgin Connect?</div>\n' +
    ' \n' +
    '  <div style="margin-top:30px; width:700px;text-align:center;font-family:verdana,tahoma,arial;font-size:18px;color:#000000;font-weight:bold;">\n' +
    'Возобновите сотрудничество с нашей <br>\n' +
    'компанией в феврале и получите <br>\n' +
    '<b style="font-size:24px;color:#e30613;">скидку 50% на абонентскую плату.</b></div>\n' +
    '\n' +
    ' <div style="margin-top:30px; width:700px;text-align:center;font-family:verdana,tahoma,arial;font-size:18px;color:#000000;font-weight:bold;">\n' +
    'Позвоните нам прямо сейчас!</div>\n' +
    '\n' +
    '<div style="margin-top:15px;width:700px;text-align:center;font-family:verdana,tahoma,arial;font-size:30px;color:#898989;font-weight:bold;">\n' +
    '<b style="font-size:22px;">(831)</b> 216 25 55\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '  <div style="margin-top:20px; width:700px;text-align:center;font-family:verdana,tahoma,arial;font-size:18px;color:#000000;font-weight:bold;">\n' +
    '\n' +
    '<b style="font-size:24px;color:#e30613;"> Virgin Connect <br>\n' +
    'Изменим бизнес к лучшему</b></div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '<div style="margin:72px 0 0 45px;width:610px;text-align:justify;font-family:verdana,tahoma,arial;font-size:12px;color:#5a5a5a; word-spacing:0px">\n' +
    'Акция предназначена для юридических лиц, ранее являвшихся абонентами компании ООО «МегаМакс», действует на услуги «Интернет» и «Каналы связи». Скидка 50% предоставляется на абонентскую плату за услуги связи в течение первых 6 месяцев. Подключение услуг осуществляется при наличии технической возможности. Подробности акции уточняйте у специалистов компании Virgin Connect. ООО «МегаМакс». Лицензии №73651, №73652, №73653,  №73654, №84517\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '<div style="margin:0 0 0px 10px;float:left; width:500px;font-family:verdana,tahoma,arial;font-size:17px;"><!--Какие-нибудь данные? телефон мб--></div><img alt="Virgin Connect" src="logo1.png" border="0" style="margin:0px 45px 30px 0; float:right;">\n' +
    '\n' +
    '  \n' +
    '</div></div>';

smtpTransport.sendMail({
    from: '**** <*****>',
    to: '****@mail.ru',
    subject: '*****',
    html: mailHtml,
}, (err, result) => {
    if(err) {
        console.log('Письмо не отправлено', err);
    } else {
        console.log('Письмо было успешно отправлено!');
    }
    smtpTransport.close();
});