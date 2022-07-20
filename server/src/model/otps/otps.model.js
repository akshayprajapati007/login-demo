const Otps = require("./otps.mongo");

const findOTPByEmail = async (email) => {
  return await Otps.findOne({
    email,
  });
};

const saveOTP = async (otpInfo) => {
  const response = await Otps.findOne(
    {
      email,
    },
    {
      otpInfo,
    },
    {
      upsert: true,
    }
  );
  return response;
};

module.exports = {
  saveOTP,
  findOTPByEmail,
};
