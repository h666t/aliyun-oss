const OSS = require('ali-oss');
const {initOSS} = require("./lib")
const {listAllBuckets} = require("./buckets")
const {listFiles} = require("./object")


module.exports = async (ctx, next) =>{
  let response = ctx.response;
  let request = ctx.request;
  if(ctx.path.indexOf("/aliyun") >= 0 ){
    initOSS();
  }
  response.status = 200;
  if(ctx.path === "/aliyun/list_all_buckets" && ctx.method === "GET"){
    let buckets = await listAllBuckets();
    response.write(buckets ? JSON.stringify(buckets) : '');
  } else if(ctx.path === "/aliyun/list_files" && ctx.method === "GET"){
    let files = await listFiles();
    response.body = files ? JSON.stringify(files) : '';
  } else {
    response.status = 400;
    response.body = "path or method error";
  }
  next()
}
