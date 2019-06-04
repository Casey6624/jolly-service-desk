const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.EMAIL_USR,
        pass: process.env.EMAIL_PASS
  }
})

module.exports = {
    sendNow: function(to, subject = "Jolly IT | Tasks", body = ""){

        var mailOptions = {
            from: process.env.EMAIL_USR,
            to: 'casey@jollyit.co.uk',
            subject: subject,
            text: body
          };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}