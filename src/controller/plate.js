const plateModel = require('../model/plate');

module.exports = function(ctx) {
  console.log(plateModel);
  ctx.response.body = '首页'
}
