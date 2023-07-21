const nodemailer = require('nodemailer');
const {config} =require('../config/config');


class MailServices{

  async sendMail(mail){
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.email, // generated ethereal user
        pass: config.emailPassword, // generated ethereal password
      },
    });
    await transporter.sendMail(mail);
    return { message: 'mail sent' };
  }

}

module.exports = MailServices
