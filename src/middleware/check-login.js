const { decodeToken } = require('../utils/token');
const { get } = require('lodash');

async function checkLogin(ctx, next) {
  const token = get(ctx, 'headers.authorization', '');
  if (!token) {
    throw {
      status: 401,
      message: '请登录！'
    }
  }

  ctx.userId = await decodeToken(token);
  return next();
}

module.exports = checkLogin;
