const OSS = require('ali-oss');
const {initOSS} = require("./lib")
const {listAllBuckets} = require("./buckets")
const {listFiles, uploadFileSteam, uploadFileMultipart} = require("./object")

module.exports = async (ctx, next) =>{
  let response = ctx.response;
  let request = ctx.request;
  if(ctx.path.indexOf("/aliyun") >= 0 ){
    initOSS();
  }
  response.status = 200;
  if(ctx.path === "/aliyun/list_all_buckets" && ctx.method === "GET"){
    let buckets = await listAllBuckets();
    response.body = buckets ? JSON.stringify(buckets) : '';
  } else if(ctx.path === "/aliyun/list_files" && ctx.method === "GET"){
    console.log(request.query);
    let files = await listFiles(request.query);
    response.body = files ? JSON.stringify(files) : '';
  } else if(ctx.path === "/aliyun/upload_file_stream" && ctx.method === "POST"){
    console.log(request.body);
    let uploadFileSteamResult = await uploadFileSteam(request.body)
    response.body = uploadFileSteamResult ? JSON.stringify(uploadFileSteamResult) : '';
  } else if (ctx.path === "/aliyun/upload_file_multipart" && ctx.method === "POST"){
    let uploadFileMultipartResult = await uploadFileMultipart(request.body);
    response.body =uploadFileMultipartResult ? JSON.stringify(uploadFileMultipartResult) : '';
  } else{
    response.status = 400;
    response.body = "path or method error";
  }
  next()
}
