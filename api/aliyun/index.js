const OSS = require('ali-oss');
const {_initOSS} = require("./lib")
const {_listAllBuckets} = require("./buckets")
const {_listFiles} = require("./object")
const {
  _uploadFileSteam,
  _uploadFileMultipart,
  _listMultipartUpload,
  _listAllFinishedMultipartUpload
} = require("./object/upload")

module.exports = async (ctx, next) => {
  let response = ctx.response;
  let request = ctx.request;
  if (ctx.path.indexOf("/aliyun") >= 0) {
    _initOSS();
  }
  response.status = 200;
  if (ctx.path === "/aliyun/list_all_buckets" && ctx.method === "GET") {
    let buckets = await _listAllBuckets();
    response.body = buckets ? JSON.stringify(buckets) : '';
  } else if (ctx.path === "/aliyun/list_files" && ctx.method === "GET") {
    console.log(request.query);
    let files = await _listFiles(request.query);
    response.body = files ? JSON.stringify(files) : '';
  } else if (ctx.path === "/aliyun/upload_file_stream" && ctx.method === "POST") {
    console.log(request.body);
    let uploadFileSteamResult = await _uploadFileSteam(request.body)
    response.body = uploadFileSteamResult ? JSON.stringify(uploadFileSteamResult) : '';
  } else if (ctx.path === "/aliyun/upload_file_multipart" && ctx.method === "POST") {
    let uploadFileMultipartResult = await _uploadFileMultipart(request.body);
    response.body = uploadFileMultipartResult ? JSON.stringify(uploadFileMultipartResult) : '';
  } else if (ctx.path === "/aliyun/list_multipart_upload" && ctx.method === "GET") {
    let listMultipartUploadResult = await _listMultipartUpload();
    response.body = listMultipartUploadResult ? JSON.stringify(listMultipartUploadResult) : '';
  } else if (ctx.path === "/aliyun/list_all_finished_multipart_upload" && ctx.method === "GET") {
    console.log(request.query)
    let listAllFinishedMultipartUploadResult = await _listAllFinishedMultipartUpload(request.query);
    response.body = listAllFinishedMultipartUploadResult ? JSON.stringify(listAllFinishedMultipartUploadResult) : '';
  } else {
    response.status = 400;
    response.body = "path or method error";
  }
  next()
}
