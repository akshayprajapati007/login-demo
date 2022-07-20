const otpMailSender = require("../../mail");
const { generateOTP } = require("../../utility/helper");
const { saveOTP, findOTPByEmail } = require("../../model/otps/otps.model");

const sendOTP = async (email) => {
  const otp = generateOTP();

  const otpInfo = {
    email,
    otp,
    expireIn: new Date().getTime() + 300 * 1000,
  };

  await saveOTP(otpInfo);
  otpMailSender(email, otp);
};

const handleOTP = async (req, res) => {
  const { email } = req.body;

  try {
    await handleOTP(email);
    return res.status(200).json({
      data: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

const validateOTP = (req, res) => {
  const { email, otp } = req.body;

  try {
    const response = await findOTPByEmail(email)
    const { expireIn } = response

    const currentTime = new Date.getTime()
    const timeDiff = expireIn - currentTime

    if (timeDiff < 0) {
      return res.status(400).json({
        error: "Verification code is expired!"
      })
    } else {
      if (response.otp === otp) {
        return res.status(200).json({
          data: "Verification code verified successfully!"
        })
      } else {
        return res.status(400).json({
          error: "Invalid verification code!"
        })
      }
    }

  } catch(error) {
    return res.status(500).json({error})
  }

};

module.exports = {
  sendOTP,
  handleOTP,
  validateOTP
};
