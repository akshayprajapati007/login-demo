const mail = require("nodemailer");
const { EMAIL_USER, EMAIl_PASS } = require("./configs");
const {
  MAIL_HOST,
  MAIL_PORT,
  EMAIL_VERIFICATION_SUBJECT,
  EMAIL_VERIFICATION_TEXT,
} = require("./utility/constants");

const transporter = mail.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIl_PASS,
  },
});

const otpMailSender = (to, otp) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    EMAIL_VERIFICATION_SUBJECT,
    text: `${EMAIL_VERIFICATION_TEXT} ${opt}`,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) return false;
    return true;
  });
};

module.exports = otpMailSender;
