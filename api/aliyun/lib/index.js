const OSS = require("ali-oss")
const secretConfig = require("../../secret_config.json")

let oss = "";
let ossOption = {
  region: 'oss-cn-shanghai',
  accessKeyId: secretConfig.accessKeyId,
  accessKeySecret: secretConfig.accessKeySecret
}
const  initOSS = () => {
  if (!oss) {
    oss = new OSS(ossOption)
  }
  return oss
}

const getOSS = () => {
  return oss
}

const updateOSS = (obj) => {
  ossOption = {
    ...ossOption,
    ...obj
  }
  oss = new OSS(ossOption)
  return oss
};

module.exports = {
  initOSS,
  getOSS,
  updateOSS
}
