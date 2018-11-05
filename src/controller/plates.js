const platesModel = require('../model/plates');
const userModel = require('../model/user');

async function get(ctx) {
  const { id } = ctx.request.query;
  const plates = platesModel.getPlates({ id })
  return plates
}

async function create(ctx) {
  const { title, desc } = ctx.request.body;
  if (!ctx.userId) {
    throw {
      status: 401,
      message: '请登录！'
    }
  }
  const { avatar } = await userModel.getUser(ctx.userId);
  const plate = await platesModel.create([ title, desc, avatar ]);
  return plate;
}

module.exports = {
  get,
  create,
}
