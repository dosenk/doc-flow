require('dotenv').config();
const bcrypt = require('bcrypt');

const getHash = (value) => {
  const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SOLT);
  return bcrypt.hashSync(value, salt);
};

module.exports = {
  getHash
};
