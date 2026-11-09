const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const credentials = {
  username: process.env.ORANGEHRM_USERNAME,
  password: process.env.ORANGEHRM_PASSWORD,
};

function getCredentials() {
  if (!credentials.username || !credentials.password) {
    throw new Error(
      'Set ORANGEHRM_USERNAME and ORANGEHRM_PASSWORD in the project .env file.'
    );
  }

  return credentials;
}

module.exports = { getCredentials };
