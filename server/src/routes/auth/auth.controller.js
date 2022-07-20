const { comparePasswords } = require("../../authorization");
const { generateToken } = require("../../jwt");
const { findUserByEmail } = require("../../model/users/users.model");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user)
    return res.status(400).json({
      error: "User doesn't exist!",
    });

  const isPasswordMatch = await comparePasswords(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      error: "Invalid credentials!",
    });
  }

  const token = generateToken({
    email: user.email,
    name: user.name,
  });

  return res.status(200).json({
    token,
  });
};

const handleSignout = async (req, res) => {
  return res.status(200).json({
    data: "Logout successfully"
  })
}

module.exports = {
  handleLogin,
  handleSignout
};
