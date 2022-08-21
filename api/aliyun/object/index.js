const {getOSS} = require("../lib")
const {appointBucket} = require("../buckets")
const listAllFiles = async (number = 100) => {
  await appointBucket()
  let oss = getOSS()
  console.log(oss)
  return await oss.list({
    "max-keys": number
  });
}

module.exports = {
  listAllFiles
}
