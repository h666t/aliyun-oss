const Koa = require('koa');
const aliyunMiddleWare = require("./aliyun/index");
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

app.use(aliyunMiddleWare)

app.use(router.routes())
app.listen(3456);
