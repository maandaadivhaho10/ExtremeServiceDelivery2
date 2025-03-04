const nodemailer = require('nodemailer');

exports.sendEmail = (to, subject, text, html) => {
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error.message);
          return res.status(500).json({ message: 'Error sending email', error });
          
        }
        res.status(200).json({ message: 'Email sent successfully', info });
      });
}


