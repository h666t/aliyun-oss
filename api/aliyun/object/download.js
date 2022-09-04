const {_appointBucket} = require("../buckets")
const {_getOSS} = require("../lib")
const fs = require("fs")

const _downloadFile = async ({path, savePath}) => {

  if (!path || !savePath) {
    throw new Error('缺少必要参数')
  }

  await _appointBucket()
  const oss = _getOSS()
  return await oss.get(path, savePath)
}

const _downloadFileByStream = async ({path, savePath}) => {
  if (!path || !savePath) {
    throw new Error('缺少必要参数')
  }

  await _appointBucket()
  const oss = _getOSS()
  const result = await oss.getStream(path);
  const writeStream = fs.createWriteStream(savePath);
  return result.stream.pipe(writeStream);
}

module.exports = {
  _downloadFile,
  _downloadFileByStream
}
