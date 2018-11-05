const request = require('superagent');
const userModel = require('../model/user');

async function get(ctx) {
  const user = await userModel.getUser(ctx.userId);
  return user;
}

async function update(ctx) {
  const { avatar, nick_name, gender, mobile } = ctx.request.body;
  const values = [avatar, nick_name, gender, mobile];
  console.log(values);
  const data = await userModel.update(values, ctx.userId)
  return data
}

async function login(ctx) {
  const { code } = ctx.request.body;
  const { appid, secret } = require('../config/mini-app');
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
      throw { status: errcode, errmsg }
    }

    const { token } = await userModel.login(openid);
    return { token };

  } catch (err) {
    if (err.status === 40029) {
      err.status = 400;
      err.message = err.message.split(',')[0]
    }

    throw err;
  }
}

module.exports = {
  get,
  update,
  login
}
