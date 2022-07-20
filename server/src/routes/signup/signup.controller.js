const { generateHashPassword } = require("../../authorization");
const { findUserByEmail, registerUser } = require("../../model/users/users.model");

const handleSignUp = async (req, res) => {
  const { email, name, password } = req.body;
  const isEmailExist = await findUserByEmail(email);

  if (isEmailExist)
    return res.status(400).json({
      error: "Email is already exist!",
    });

  if (!email || !name || !password) {
    return res.status(400).json({
      error: "Missing required fields!",
    });
  }

  const hasPassword = await generateHashPassword(password);
  req.body.password = hasPassword;
  const user = await registerUser(req.body);
  return res.status(201).json({
    data: user,
  });
};

module.exports = {
  handleSignUp,
};
