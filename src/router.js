const plate = require('./controller/plate');
const user = require('./controller/user');

const Router = require('koa-router');
const router = new Router();

router.get('/api/v1/plate', plate);
router.get('/api/v1/users', user.get);
router.post('/api/v1/users', user.update);
router.post('/api/v1/users/login', user.login);

module.exports = router;
