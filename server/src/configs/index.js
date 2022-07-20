const JWT_TOKEN_SECRET = process.env.JWT_SECRET;
const MONGO_PASSWORD = process.env.MONGODB_PASS;
const SERVER_PORT = process.env.PORT;

const EMAIL_USER = process.env.MAIL_USER;
const EMAIl_PASS = process.env.MAIL_PASS;

module.exports = {
  JWT_TOKEN_SECRET,
  MONGO_PASSWORD,
  SERVER_PORT,
  EMAIL_USER,
  EMAIl_PASS,
};
