const {getOSS} = require("../lib")
const {appointBucket} = require("../buckets")
const fs = require('fs');
const path = require('path');

const listFiles = async ({number = 100, prefix, is_show_all_files = 0, next_continuation_token = ""}) => {
  await appointBucket()
  let oss = getOSS()
  let param = {
    "max-keys": number,
  };
  if(is_show_all_files === '0'){
    param.delimiter = "/"
  }
  if(prefix){
    param.prefix = prefix;
  };
  if(next_continuation_token){
    param['continuation-token'] = next_continuation_token;
  }
  return await oss.listV2(param);
}

const uploadFileSteam = async ({file_path, file_name, dir}) => { // 流上传
  if(!file_path || !file_name || !dir){
    throw new Error('uploadFileSteam缺少必要参数')
  }
  await appointBucket();
  file_path = path.normalize(file_path);
  let oss = getOSS();
  let stream = fs.createReadStream(file_path);
  let extname = path.extname(file_path);
  console.log(extname);
  console.log(file_path);
  return await oss.putStream(`${dir}/${file_name}.${extname}`, stream);
};

const uploadFileMultipart = async ({file_path, file_name, dir}) => { // 分片上传
  if(!file_path || !file_name || !dir){
    throw new Error('uploadFileSteam缺少必要参数')
  }

  // TODO 需要一个缓存来实现记录上传进度和当前正在上传的任务？
  const progress = (p, _checkpoint) => {
    // Object的上传进度。
    console.log(p); 
    // 分片上传的断点信息。
    console.log(_checkpoint);
  };

  await appointBucket();
  file_path = path.normalize(file_path);
  let oss = getOSS();
  let extname = path.extname(file_path);

  let res = await oss.multipartUpload(`${dir}/${file_name}.${extname}`, file_path, {
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

module.exports = {
  listFiles,
  uploadFileSteam,
  uploadFileMultipart
}
