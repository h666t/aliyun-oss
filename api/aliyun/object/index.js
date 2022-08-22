const {getOSS} = require("../lib")
const {appointBucket} = require("../buckets")
const listFiles = async (number = 100) => {
  await appointBucket()
  let oss = getOSS()
  return await oss.listV2({
    "max-keys": number
  });
}

module.exports = {
  listFiles
}
