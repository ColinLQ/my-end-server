const { sign } = require('jsonwebtoken');
const { privateKey } = require('../confing/mini-app')

async function createToken(id) {
  return new Promise(resolve => {
    const options = { expiresIn: '7d' }
    sign({ id }, privateKey, options, (err, token) => {
      if (err) {
        throw {
          status: 401,
          message: err.message
        }
      }
      resolve(token);
    })
  })
}

function decodeToken(token) {
  return token;
}

module.exports = {
  createToken,
  decodeToken
}
