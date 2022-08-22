const Koa = require('koa');
const aliyunMiddleWare = require("./aliyun/index");
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(aliyunMiddleWare)

app.use(router.routes())
app.listen(3456);
