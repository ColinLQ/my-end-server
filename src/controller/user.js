const request = require('superagent');
const { handleError, handleSuccess } = require('../utils/handle-response');
const userModel = require('../model/user');

function get(ctx) {
}

function update(ctx) {
}

async function login(ctx) {
  const { code } = ctx.request.body;
  const { appid, secret } = require('../confing/mini-app');
  try {
    const res = await request
      .get('https://api.weixin.qq.com/sns/jscode2session')
      .set('Content-Type', 'application/json')
      .query({
        appid,
        secret,
        js_code: code,
        grant_type: 'authorization_code'
      });
    const { errcode, errmsg, openid } = JSON.parse(res.text);
    if (errcode) {
      return handleError(ctx, errmsg, errcode)
    }

    const { token } = await userModel.login(openid);
    handleSuccess(ctx, { token });

  } catch (err) {
    if (err.status === 40029) {
      err.status = 400;
      err.message = err.message.split(',')[0]
    }

    ctx.status = err.status || 500;
    ctx.body = err;
  }
}

module.exports = {
  get,
  update,
  login
}
