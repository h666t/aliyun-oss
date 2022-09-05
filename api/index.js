const Koa = require('koa');
const aliyunMiddleWare = require("./aliyun/index");
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { _startDatabase, _checkIsDatabasecontect } = require('./database');
const { _defineAllModel } = require('./database/model')

const app = new Koa();
const router = new Router();

_startDatabase()
_defineAllModel();
// app.use(async ctx => {
//     try {
//         console.log(132312312);
//         _startDatabase();
//         await _checkIsDatabasecontect();
//         await _defineAllModel()   
//     } catch (error) {
//         console.error(error)
//     }
// });



app.use(bodyParser());
app.use(aliyunMiddleWare)

app.use(router.routes())

app.listen(3456);
console.log('开启服务成功，正在监听3456端口; dev_url: localhost:3456');
