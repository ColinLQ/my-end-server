const { sign, verify } = require('jsonwebtoken');
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
  const options = { ignoreExpiration: false };
  return new Promise(resolve => {
    verify(token, privateKey, options, (err, decoded) => {
      if (err) {
        throw {
          status: 401,
          message: err.message
        }
      }
      resolve(decoded.id)
    })
  })
}

module.exports = {
  createToken,
  decodeToken
}
