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

const uploadFileSteam = async ({file_path, file_name, dir}) => {
  if(!file_path || !file_name || !dir){
    throw new Error('uploadFileSteam缺少必要参数')
  }
  await appointBucket();
  let oss = getOSS();
  let stream = fs.createReadStream(file_path);
  let extname = path.extname(file_path);
  console.log(extname);
  console.log(file_path);
  // return await oss.putStream(`${dir}/${file_name}.${extname}`, stream);
};

module.exports = {
  listFiles,
  uploadFileSteam
}
