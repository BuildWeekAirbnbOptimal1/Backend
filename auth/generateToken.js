const jwt = require('jsonwebtoken');
const secrets = process.env.JWT_SECRET;

module.exports = generateToken;

function generateToken(user) {
  // add user.id
  const payload = {
    id: user.id
  };

  const options = {
    expiresIn: '1h'
  };

  const token = jwt.sign(payload, secrets, options);
  return token;
}