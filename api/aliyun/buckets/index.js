const {getOSS, updateOSS} = require("../lib")
const listAllBuckets = async () => {
  let oss = getOSS()
  return  await oss.listBuckets();
}
const appointBucket = async () => {
  let allBuckets = await listAllBuckets();
  return updateOSS({
    bucket: allBuckets.buckets[0]['name']
  });
}
module.exports = {
  listAllBuckets,
  appointBucket
}
