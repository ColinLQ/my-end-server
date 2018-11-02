const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const handleResponse = require('./middleware/handle-response');

const app = new Koa();

app.use(bodyParser());
app.use(handleResponse);
app.use(router.routes());

app.listen(3000);
