const {_appointBucket} = require("../buckets")
const path = require("path")
const {_getOSS} = require("../lib")
const fs = require("fs")
const _uploadFileSteam = async ({file_path, file_name, dir}) => { // 流上传
  if (!file_path || !file_name || !dir) {
    throw new Error('uploadFileSteam缺少必要参数')
  }
  await _appointBucket();
  file_path = path.normalize(file_path);
  let oss = _getOSS();
  let stream = fs.createReadStream(file_path);
  let extname = path.extname(file_path);
  console.log(extname);
  console.log(file_path);
  return await oss.putStream(`${dir}/${file_name}${extname}`, stream);
};

const _uploadFileMultipart = async ({file_path, file_name, dir}) => { // 分片上传
  if (!file_path || !file_name || !dir) {
    throw new Error('uploadFileSteam缺少必要参数')
  }

  // TODO 需要一个缓存来实现记录上传进度和当前正在上传的任务？
  const progress = (p, _checkpoint) => {
    // Object的上传进度。
    console.log(p);
    // 分片上传的断点信息。
    console.log(_checkpoint);
  };

  await _appointBucket();
  file_path = path.normalize(file_path);
  let oss = _getOSS();
  let extname = path.extname(file_path);

  let res = await oss.multipartUpload(`${dir}/${file_name}${extname}`, file_path, {
    progress,
    headers: {
      'Content-Encoding': 'utf-8',
      'x-oss-forbid-overwrite': 'false'
    }
    // headers,
    // 指定meta参数，自定义Object的元信息。通过head接口可以获取到Object的meta数据。
    // meta: {
    //   year: 2020,
    //   people: 'test',
    // },
  });
  console.log(res);
  return res;
};

const _abortMultipartUpload = async ({path, uploadId}) => {
  await _appointBucket();
  let oss = _getOSS();
  return await oss.abortMultipartUpload(path, uploadId, {});
};

const _listMultipartUpload = async (query = {}) => { // 1000个
  query['max-uploads'] = 1000;
  await _appointBucket()
  let oss = _getOSS();
  return await oss.listUploads(query, {});
}

const _listAllFinishedMultipartUpload = async ({path, uploadId, query = {}}) => {
  query['max-uploads'] = 1000;
  await _appointBucket()
  let oss = _getOSS()
  return await oss.listParts(path, uploadId, query, {});
}

module.exports = {
  _uploadFileSteam,
  _uploadFileMultipart,
  _abortMultipartUpload,
  _listMultipartUpload,
  _listAllFinishedMultipartUpload
}
