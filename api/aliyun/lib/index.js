const OSS = require("ali-oss")
const secretConfig = require("../../secret_config.json")

let oss = "";
let ossOption = {
  region: 'oss-cn-shanghai',
  accessKeyId: secretConfig.accessKeyId,
  accessKeySecret: secretConfig.accessKeySecret
}

const  _initOSS = () => {
  if (!oss) {
    oss = new OSS(ossOption)
  }
  return oss
}

const _getOSS = () => {
  return oss
}

const _updateOSS = (obj) => {
  ossOption = {
    ...ossOption,
    ...obj
  }
  oss = new OSS(ossOption)
  return oss
};

module.exports = {
  _initOSS,
  _getOSS,
  _updateOSS
}
