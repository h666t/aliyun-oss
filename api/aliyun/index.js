const OSS = require('ali-oss');
const {initOSS} = require("./lib")
const {listAllBuckets} = require("./buckets")
const {listAllFiles} = require("./object")


module.exports = async (ctx, next) =>{
  let response = ctx.res;
  if(ctx.path.indexOf("/aliyun") >= 0 ){
    initOSS();
  }
  if(ctx.path === "/aliyun/list_all_buckets" && ctx.method === "GET"){
    let buckets = await listAllBuckets();
    response.statusCode = 200;
    response.write(buckets ? JSON.stringify(buckets) : '');
  } else if(ctx.path === "/aliyun/list_all_files" && ctx.method === "GET"){
    let files = await listAllFiles();
    response.write(files ? JSON.stringify(files) : '');
  } else {
    response.statusCode = 400;
    response.write("path or method error");
  }
  response.end();
  next()
}
