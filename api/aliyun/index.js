const OSS = require('ali-oss');
const {_initOSS} = require("./lib")
const {_listAllBuckets} = require("./buckets")
const {_listFiles, _checkIsFileExist, _deleteSingleFile, _createDirectory} = require("./object")
const {
  _uploadFileStream,
  _uploadFileMultipart,
  _listMultipartUpload,
  _listAllFinishedMultipartUpload
} = require("./object/upload")
const {_downloadFile, _downloadFileByStream} = require("./object/download")

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
    let uploadFileSteamResult = await _uploadFileStream(request.body)
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
  } else if (ctx.path === "/aliyun/download_file" && ctx.method === "GET") {
    console.log(request.query)
    let downloadFileResult = await _downloadFile(request.query);
    response.body = downloadFileResult ? JSON.stringify(downloadFileResult) : '';
  }else if (ctx.path === "/aliyun/download_file_by_stream" && ctx.method === "GET") {
    let downloadFileByStreamResult = await _downloadFileByStream(request.query);
    response.body = downloadFileByStreamResult ? JSON.stringify(downloadFileByStreamResult) : '';
  }else if (ctx.path === "/aliyun/check_is_file_exist" && ctx.method === "GET") {
    let checkIsFileExistResult = await _checkIsFileExist(request.query);
    response.body = checkIsFileExistResult ? JSON.stringify(checkIsFileExistResult) : '';
  }else if (ctx.path === "/aliyun/delete_single_file" && ctx.method === "GET") {
    let deleteSingleFileResult = await _deleteSingleFile(request.query);
    response.body = deleteSingleFileResult ? JSON.stringify(deleteSingleFileResult) : '';
  }else if (ctx.path === "/aliyun/create_directory" && ctx.method === "GET") {
    let createDirectoryResult = await _createDirectory(request.query);
    response.body = createDirectoryResult ? JSON.stringify(createDirectoryResult) : '';
  } else {
    response.status = 400;
    response.body = "path or method error";
  }
  next()
}
