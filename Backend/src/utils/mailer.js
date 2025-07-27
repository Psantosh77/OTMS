const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false because STARTTLS is used
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // optional, useful in dev environments
  },
});

const sendOtpMail = async (email, otp) => {
    
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to:email.to,
    subject:email.subject,
    html: email.text, // or use plain `text: text`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpMail;
