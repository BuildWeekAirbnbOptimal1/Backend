const jwt = require('jsonwebtoken');
const secrets = require('../middleware/secrets')

module.exports = generateToken;

function generateToken(user) {
  // add user.id
  const payload = {
    id: user.id
  };

  const options = {
    expiresIn: '1h'
  };

  console.log("MY SECRET: ", secrets.jwtSecret);

  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}