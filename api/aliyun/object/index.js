const {_getOSS} = require("../lib")
const {_appointBucket} = require("../buckets")

const _listFiles = async ({number = 100, prefix, is_show_all_files = 0, next_continuation_token = ""}) => {
  await _appointBucket()
  let oss = _getOSS()
  let param = {
    "max-keys": number,
  };
  if (is_show_all_files === 0) {
    param.delimiter = "/"
  }
  if (prefix) {
    param.prefix = prefix;
  }
  ;
  if (next_continuation_token) {
    param['continuation-token'] = next_continuation_token;
  }
  return await oss.listV2(param);
}

const _checkIsFileExist = async ({path, options = {}}) => {

  if(!path){
    throw new Error("输入参数错误")
  }

  await _appointBucket()
  let oss = _getOSS();
  try {
    return await oss.head(path, options)
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      return '文件不存在'
    } else {
      return error
    }
  }
  
}

// TODO 拷贝文件
// const copySmallFile = async () => {

// }

const _deleteSingleFile = async ({path}) => {
  await _appointBucket();
  let oss = _getOSS();
  return await oss.delete(path)
}

const _createDirectory = async ({directoryName}) => {
  if(!directoryName){
    throw new Error("输入参数错误")
  }
  await _appointBucket()
  let oss = _getOSS();
  return await oss.put(`${directoryName}/`, new Buffer(''));
}

module.exports = {
  _listFiles,
  _checkIsFileExist,
  _deleteSingleFile,
  _createDirectory
}
