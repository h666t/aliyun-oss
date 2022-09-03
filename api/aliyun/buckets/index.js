const {_getOSS, _updateOSS} = require("../lib")
const _listAllBuckets = async () => {
  let oss = _getOSS()
  return  await oss.listBuckets();
}
const _appointBucket = async () => {
  let allBuckets = await _listAllBuckets();
  return _updateOSS({
    bucket: allBuckets.buckets[0]['name']
  });
}
module.exports = {
  _listAllBuckets,
  _appointBucket
}
