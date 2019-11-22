const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email
    } 

    const options = {
      expiresIn: '1d'
    }

    const result = jwt.sign(
      payload,
      secrets.jwtSecret,
      options
    )
    return result;
}

module.exports = generateToken;