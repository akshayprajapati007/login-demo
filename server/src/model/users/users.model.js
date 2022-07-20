const users = require("./users.mongo");

const findUserByEmail = async (email) => {
  const user = await users.findOne(
    {
      email: email,
    },
    "-__v"
  );
  return user;
};

const getAllUsers = async () => {
  return await users.find(
    {},
    "-__v"
  );
};

const registerUser = async (user) => {
  try {
    const newUser = new users(user);
    await newUser.save();
    const data = {
      email: user.email,
      name: user.name,
    };
    return {
      data,
      status: "Account created successfully!",
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  findUserByEmail,
  registerUser,
};
