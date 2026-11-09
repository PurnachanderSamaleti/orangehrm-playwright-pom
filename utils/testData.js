const validUser = {
  username: process.env.ORANGE_USERNAME,
  password: process.env.ORANGE_PASSWORD,
};

const invalidUser = {
  username: 'Admin',
  password: 'admin123456',
};

module.exports = { validUser, invalidUser };
